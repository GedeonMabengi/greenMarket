import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;

const apiBaseUrl = String.fromEnvironment(
  'API_BASE_URL',
  defaultValue: 'http://10.0.2.2:8000/api',
);

void main() {
  runApp(const GreenMarketApp());
}

class GreenMarketApp extends StatelessWidget {
  const GreenMarketApp({super.key});

  @override
  Widget build(BuildContext context) {
    const green = Color(0xFF17843B);
    const earth = Color(0xFF7A4E21);

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'GreenMarket',
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: green,
          primary: green,
          secondary: earth,
          surface: const Color(0xFFF7FAF5),
        ),
        scaffoldBackgroundColor: const Color(0xFFF7FAF5),
        appBarTheme: const AppBarTheme(
          centerTitle: false,
          elevation: 0,
          backgroundColor: Color(0xFFF7FAF5),
          foregroundColor: Color(0xFF183321),
          systemOverlayStyle: SystemUiOverlayStyle.dark,
        ),
        cardTheme: CardThemeData(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
            side: const BorderSide(color: Color(0xFFE2E8DD)),
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: Colors.white,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: const BorderSide(color: Color(0xFFD7E1D2)),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: const BorderSide(color: Color(0xFFD7E1D2)),
          ),
        ),
      ),
      home: const StoreShell(),
    );
  }
}

class StoreShell extends StatefulWidget {
  const StoreShell({super.key});

  @override
  State<StoreShell> createState() => _StoreShellState();
}

class _StoreShellState extends State<StoreShell> {
  final api = GreenMarketApi();
  final cart = CartStore();
  User? user;
  String? token;
  int tabIndex = 0;

  bool get isSignedIn => token != null && user != null;

  void setSession(AuthSession session) {
    setState(() {
      token = session.token;
      user = session.user;
      tabIndex = 0;
    });
  }

  void signOut() async {
    final activeToken = token;
    setState(() {
      token = null;
      user = null;
      tabIndex = 0;
    });
    if (activeToken != null) {
      await api.logout(activeToken);
    }
  }

  @override
  Widget build(BuildContext context) {
    final pages = [
      CatalogScreen(api: api, cart: cart),
      CartScreen(
        api: api,
        cart: cart,
        token: token,
        isSignedIn: isSignedIn,
        onRequireLogin: () => setState(() => tabIndex = 2),
      ),
      AccountScreen(
        api: api,
        user: user,
        token: token,
        onSignedIn: setSession,
        onSignedOut: signOut,
      ),
    ];

    return ListenableBuilder(
      listenable: cart,
      builder: (context, _) {
        return Scaffold(
          body: SafeArea(child: pages[tabIndex]),
          bottomNavigationBar: NavigationBar(
            selectedIndex: tabIndex,
            onDestinationSelected: (index) => setState(() => tabIndex = index),
            destinations: [
              const NavigationDestination(
                icon: Icon(Icons.storefront_outlined),
                selectedIcon: Icon(Icons.storefront),
                label: 'Marche',
              ),
              NavigationDestination(
                icon: Badge.count(
                  count: cart.totalItems,
                  isLabelVisible: cart.totalItems > 0,
                  child: const Icon(Icons.shopping_basket_outlined),
                ),
                selectedIcon: Badge.count(
                  count: cart.totalItems,
                  isLabelVisible: cart.totalItems > 0,
                  child: const Icon(Icons.shopping_basket),
                ),
                label: 'Panier',
              ),
              NavigationDestination(
                icon: Icon(isSignedIn ? Icons.person : Icons.login),
                label: isSignedIn ? 'Compte' : 'Connexion',
              ),
            ],
          ),
        );
      },
    );
  }
}

class CatalogScreen extends StatefulWidget {
  const CatalogScreen({super.key, required this.api, required this.cart});

  final GreenMarketApi api;
  final CartStore cart;

  @override
  State<CatalogScreen> createState() => _CatalogScreenState();
}

class _CatalogScreenState extends State<CatalogScreen> {
  final searchController = TextEditingController();
  late Future<CatalogPayload> future;
  String? selectedCategory;

  @override
  void initState() {
    super.initState();
    future = widget.api.fetchCatalog();
  }

  @override
  void dispose() {
    searchController.dispose();
    super.dispose();
  }

  void reload() {
    setState(() {
      future = widget.api.fetchCatalog(
        search: searchController.text.trim(),
        category: selectedCategory,
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: () async => reload(),
      child: CustomScrollView(
        slivers: [
          SliverAppBar(
            pinned: true,
            title: const Text('GreenMarket'),
            actions: [
              IconButton(
                tooltip: 'Actualiser',
                onPressed: reload,
                icon: const Icon(Icons.refresh),
              ),
            ],
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Produits frais pres de chez vous',
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.w800,
                      color: const Color(0xFF183321),
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Achetez directement aupres des fermiers locaux.',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Colors.grey.shade700,
                    ),
                  ),
                  const SizedBox(height: 16),
                  SearchBar(
                    controller: searchController,
                    hintText: 'Rechercher tomates, lait, miel...',
                    leading: const Icon(Icons.search),
                    trailing: [
                      IconButton(
                        tooltip: 'Rechercher',
                        onPressed: reload,
                        icon: const Icon(Icons.arrow_forward),
                      ),
                    ],
                    onSubmitted: (_) => reload(),
                  ),
                ],
              ),
            ),
          ),
          FutureBuilder<CatalogPayload>(
            future: future,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const SliverFillRemaining(
                  child: Center(child: CircularProgressIndicator()),
                );
              }
              if (snapshot.hasError) {
                return SliverFillRemaining(
                  child: ErrorState(
                    message: snapshot.error.toString(),
                    onRetry: reload,
                  ),
                );
              }

              final data = snapshot.data!;
              return SliverList.list(
                children: [
                  CategoryChips(
                    categories: data.categories,
                    selectedSlug: selectedCategory,
                    onSelected: (slug) {
                      setState(() {
                        selectedCategory = selectedCategory == slug ? null : slug;
                      });
                      reload();
                    },
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(16, 8, 16, 10),
                    child: Text(
                      '${data.total} produit${data.total > 1 ? 's' : ''} disponible${data.total > 1 ? 's' : ''}',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                  if (data.products.isEmpty)
                    const EmptyState(
                      icon: Icons.search_off,
                      title: 'Aucun produit trouve',
                      message: 'Essayez une autre recherche ou categorie.',
                    )
                  else
                    ...data.products.map(
                      (product) => ProductTile(
                        product: product,
                        onOpen: () => Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (_) => ProductDetailScreen(
                              productId: product.id,
                              api: widget.api,
                              cart: widget.cart,
                            ),
                          ),
                        ),
                        onAdd: () {
                          widget.cart.add(product);
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text('${product.name} ajoute au panier'),
                            ),
                          );
                        },
                      ),
                    ),
                  const SizedBox(height: 20),
                ],
              );
            },
          ),
        ],
      ),
    );
  }
}

class CategoryChips extends StatelessWidget {
  const CategoryChips({
    super.key,
    required this.categories,
    required this.selectedSlug,
    required this.onSelected,
  });

  final List<Category> categories;
  final String? selectedSlug;
  final ValueChanged<String> onSelected;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 54,
      child: ListView.separated(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        scrollDirection: Axis.horizontal,
        itemCount: categories.length,
        separatorBuilder: (_, _) => const SizedBox(width: 8),
        itemBuilder: (context, index) {
          final category = categories[index];
          return ChoiceChip(
            label: Text(category.name),
            avatar: Icon(category.iconData, size: 18),
            selected: selectedSlug == category.slug,
            onSelected: (_) => onSelected(category.slug),
          );
        },
      ),
    );
  }
}

class ProductTile extends StatelessWidget {
  const ProductTile({
    super.key,
    required this.product,
    required this.onOpen,
    required this.onAdd,
  });

  final Product product;
  final VoidCallback onOpen;
  final VoidCallback onAdd;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.fromLTRB(16, 6, 16, 10),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onOpen,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ProductImage(product: product, height: 160),
            Padding(
              padding: const EdgeInsets.all(14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              product.name,
                              style: Theme.of(context)
                                  .textTheme
                                  .titleMedium
                                  ?.copyWith(fontWeight: FontWeight.w800),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              product.category?.name ?? 'Produit agricole',
                              style: TextStyle(color: Colors.grey.shade700),
                            ),
                          ],
                        ),
                      ),
                      Text(
                        formatMoney(product.price),
                        style: const TextStyle(
                          color: Color(0xFF17843B),
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Text(
                    product.description ?? 'Produit frais disponible maintenant.',
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(color: Colors.grey.shade800),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Icon(Icons.inventory_2_outlined, size: 18, color: Colors.grey.shade700),
                      const SizedBox(width: 6),
                      Expanded(
                        child: Text(
                          '${formatNumber(product.quantity)} ${product.unit} dispo',
                          style: TextStyle(color: Colors.grey.shade700),
                        ),
                      ),
                      FilledButton.icon(
                        onPressed: onAdd,
                        icon: const Icon(Icons.add_shopping_cart),
                        label: const Text('Ajouter'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class ProductDetailScreen extends StatefulWidget {
  const ProductDetailScreen({
    super.key,
    required this.productId,
    required this.api,
    required this.cart,
  });

  final int productId;
  final GreenMarketApi api;
  final CartStore cart;

  @override
  State<ProductDetailScreen> createState() => _ProductDetailScreenState();
}

class _ProductDetailScreenState extends State<ProductDetailScreen> {
  late Future<Product> future;

  @override
  void initState() {
    super.initState();
    future = widget.api.fetchProduct(widget.productId);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Detail produit')),
      body: FutureBuilder<Product>(
        future: future,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError) {
            return ErrorState(
              message: snapshot.error.toString(),
              onRetry: () => setState(() => future = widget.api.fetchProduct(widget.productId)),
            );
          }
          final product = snapshot.data!;
          return ListView(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: ProductImage(product: product, height: 230),
              ),
              const SizedBox(height: 18),
              Text(
                product.name,
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.w900,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                formatMoney(product.price),
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: const Color(0xFF17843B),
                  fontWeight: FontWeight.w900,
                ),
              ),
              const SizedBox(height: 14),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  InfoChip(icon: Icons.category_outlined, label: product.category?.name ?? 'Categorie'),
                  InfoChip(icon: Icons.scale_outlined, label: '${formatNumber(product.quantity)} ${product.unit}'),
                  if (product.distance != null) InfoChip(icon: Icons.place_outlined, label: '${product.distance} km'),
                ],
              ),
              const SizedBox(height: 18),
              Text(
                product.description ?? 'Aucune description fournie.',
                style: Theme.of(context).textTheme.bodyLarge,
              ),
              const SizedBox(height: 18),
              ListTile(
                contentPadding: EdgeInsets.zero,
                leading: CircleAvatar(
                  backgroundColor: const Color(0xFFE1F3E5),
                  child: Text(product.sellerName.substring(0, 1).toUpperCase()),
                ),
                title: Text(product.sellerName),
                subtitle: Text(product.sellerAddress ?? 'Producteur local'),
              ),
              const SizedBox(height: 20),
              FilledButton.icon(
                onPressed: () {
                  widget.cart.add(product);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('${product.name} ajoute au panier')),
                  );
                },
                icon: const Icon(Icons.add_shopping_cart),
                label: const Text('Ajouter au panier'),
              ),
            ],
          );
        },
      ),
    );
  }
}

class ProductImage extends StatelessWidget {
  const ProductImage({super.key, required this.product, required this.height});

  final Product product;
  final double height;

  @override
  Widget build(BuildContext context) {
    final imageUrl = product.absoluteImageUrl;
    return SizedBox(
      height: height,
      width: double.infinity,
      child: imageUrl == null
          ? ColoredBox(
              color: const Color(0xFFE8EEE4),
              child: Icon(Icons.image_outlined, size: 54, color: Colors.grey.shade500),
            )
          : Image.network(
              imageUrl,
              fit: BoxFit.cover,
              errorBuilder: (_, _, _) => ColoredBox(
                color: const Color(0xFFE8EEE4),
                child: Icon(Icons.broken_image_outlined, size: 54, color: Colors.grey.shade500),
              ),
            ),
    );
  }
}

class CartScreen extends StatefulWidget {
  const CartScreen({
    super.key,
    required this.api,
    required this.cart,
    required this.token,
    required this.isSignedIn,
    required this.onRequireLogin,
  });

  final GreenMarketApi api;
  final CartStore cart;
  final String? token;
  final bool isSignedIn;
  final VoidCallback onRequireLogin;

  @override
  State<CartScreen> createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  bool isSubmitting = false;

  Future<void> checkout() async {
    if (!widget.isSignedIn) {
      widget.onRequireLogin();
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Connectez-vous pour commander.')),
      );
      return;
    }

    setState(() => isSubmitting = true);
    try {
      await widget.api.createOrder(widget.token!, widget.cart.items);
      widget.cart.clear();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Commande envoyee avec succes.')),
        );
      }
    } catch (error) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(error.toString())),
        );
      }
    } finally {
      if (mounted) setState(() => isSubmitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: widget.cart,
      builder: (context, _) {
        final items = widget.cart.items;
        return Scaffold(
          appBar: AppBar(title: const Text('Panier')),
          body: items.isEmpty
              ? const EmptyState(
                  icon: Icons.shopping_basket_outlined,
                  title: 'Votre panier est vide',
                  message: 'Ajoutez des produits depuis le marche.',
                )
              : ListView.separated(
                  padding: const EdgeInsets.fromLTRB(16, 8, 16, 120),
                  itemCount: items.length,
                  separatorBuilder: (_, _) => const SizedBox(height: 8),
                  itemBuilder: (context, index) {
                    final item = items[index];
                    return Card(
                      child: Padding(
                        padding: const EdgeInsets.all(12),
                        child: Row(
                          children: [
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    item.product.name,
                                    style: const TextStyle(fontWeight: FontWeight.w800),
                                  ),
                                  const SizedBox(height: 4),
                                  Text('${formatMoney(item.product.price)} / ${item.product.unit}'),
                                  Text('Sous-total: ${formatMoney(item.total)}'),
                                ],
                              ),
                            ),
                            IconButton(
                              tooltip: 'Retirer',
                              onPressed: () => widget.cart.decrease(item.product),
                              icon: const Icon(Icons.remove_circle_outline),
                            ),
                            SizedBox(
                              width: 48,
                              child: Text(
                                formatNumber(item.quantity),
                                textAlign: TextAlign.center,
                                style: const TextStyle(fontWeight: FontWeight.w800),
                              ),
                            ),
                            IconButton(
                              tooltip: 'Ajouter',
                              onPressed: () => widget.cart.add(item.product),
                              icon: const Icon(Icons.add_circle_outline),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
          bottomSheet: items.isEmpty
              ? null
              : Container(
                  padding: const EdgeInsets.fromLTRB(16, 14, 16, 16),
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    border: Border(top: BorderSide(color: Color(0xFFE2E8DD))),
                  ),
                  child: SafeArea(
                    child: Row(
                      children: [
                        Expanded(
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text('Total'),
                              Text(
                                formatMoney(widget.cart.total),
                                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                                  fontWeight: FontWeight.w900,
                                ),
                              ),
                            ],
                          ),
                        ),
                        FilledButton.icon(
                          onPressed: isSubmitting ? null : checkout,
                          icon: isSubmitting
                              ? const SizedBox(
                                  width: 18,
                                  height: 18,
                                  child: CircularProgressIndicator(strokeWidth: 2),
                                )
                              : const Icon(Icons.check),
                          label: const Text('Commander'),
                        ),
                      ],
                    ),
                  ),
                ),
        );
      },
    );
  }
}

class AccountScreen extends StatefulWidget {
  const AccountScreen({
    super.key,
    required this.api,
    required this.user,
    required this.token,
    required this.onSignedIn,
    required this.onSignedOut,
  });

  final GreenMarketApi api;
  final User? user;
  final String? token;
  final ValueChanged<AuthSession> onSignedIn;
  final VoidCallback onSignedOut;

  @override
  State<AccountScreen> createState() => _AccountScreenState();
}

class _AccountScreenState extends State<AccountScreen> {
  bool registerMode = false;
  bool loading = false;
  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final confirmController = TextEditingController();
  final phoneController = TextEditingController();
  final addressController = TextEditingController();

  @override
  void dispose() {
    nameController.dispose();
    emailController.dispose();
    passwordController.dispose();
    confirmController.dispose();
    phoneController.dispose();
    addressController.dispose();
    super.dispose();
  }

  Future<void> submit() async {
    setState(() => loading = true);
    try {
      final session = registerMode
          ? await widget.api.register(
              name: nameController.text.trim(),
              email: emailController.text.trim(),
              password: passwordController.text,
              confirmation: confirmController.text,
              phone: phoneController.text.trim(),
              address: addressController.text.trim(),
            )
          : await widget.api.login(
              email: emailController.text.trim(),
              password: passwordController.text,
            );
      widget.onSignedIn(session);
    } catch (error) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(error.toString())),
        );
      }
    } finally {
      if (mounted) setState(() => loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (widget.user != null) {
      return Scaffold(
        appBar: AppBar(title: const Text('Compte')),
        body: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  children: [
                    CircleAvatar(
                      radius: 28,
                      backgroundColor: const Color(0xFFE1F3E5),
                      child: Text(
                        widget.user!.name.substring(0, 1).toUpperCase(),
                        style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900),
                      ),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            widget.user!.name,
                            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                              fontWeight: FontWeight.w900,
                            ),
                          ),
                          Text(widget.user!.email),
                          Text(widget.user!.role),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 10),
            FilledButton.icon(
              onPressed: widget.onSignedOut,
              icon: const Icon(Icons.logout),
              label: const Text('Se deconnecter'),
            ),
          ],
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(title: Text(registerMode ? 'Creer un compte' : 'Connexion')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text(
            registerMode ? 'Rejoindre GreenMarket' : 'Bon retour',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.w900,
            ),
          ),
          const SizedBox(height: 16),
          if (registerMode) ...[
            TextField(
              controller: nameController,
              textInputAction: TextInputAction.next,
              decoration: const InputDecoration(labelText: 'Nom complet'),
            ),
            const SizedBox(height: 10),
          ],
          TextField(
            controller: emailController,
            keyboardType: TextInputType.emailAddress,
            textInputAction: TextInputAction.next,
            decoration: const InputDecoration(labelText: 'Email'),
          ),
          const SizedBox(height: 10),
          TextField(
            controller: passwordController,
            obscureText: true,
            textInputAction: TextInputAction.next,
            decoration: const InputDecoration(labelText: 'Mot de passe'),
          ),
          if (registerMode) ...[
            const SizedBox(height: 10),
            TextField(
              controller: confirmController,
              obscureText: true,
              textInputAction: TextInputAction.next,
              decoration: const InputDecoration(labelText: 'Confirmer le mot de passe'),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: phoneController,
              keyboardType: TextInputType.phone,
              textInputAction: TextInputAction.next,
              decoration: const InputDecoration(labelText: 'Telephone'),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: addressController,
              decoration: const InputDecoration(labelText: 'Adresse'),
            ),
          ],
          const SizedBox(height: 18),
          FilledButton.icon(
            onPressed: loading ? null : submit,
            icon: loading
                ? const SizedBox(
                    width: 18,
                    height: 18,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  )
                : Icon(registerMode ? Icons.person_add : Icons.login),
            label: Text(registerMode ? 'Creer mon compte' : 'Se connecter'),
          ),
          TextButton(
            onPressed: loading ? null : () => setState(() => registerMode = !registerMode),
            child: Text(registerMode ? 'J ai deja un compte' : 'Creer un compte acheteur'),
          ),
        ],
      ),
    );
  }
}

class InfoChip extends StatelessWidget {
  const InfoChip({super.key, required this.icon, required this.label});

  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Chip(
      avatar: Icon(icon, size: 18),
      label: Text(label),
      backgroundColor: const Color(0xFFEAF5EC),
      side: BorderSide.none,
    );
  }
}

class EmptyState extends StatelessWidget {
  const EmptyState({
    super.key,
    required this.icon,
    required this.title,
    required this.message,
  });

  final IconData icon;
  final String title;
  final String message;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(28),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 58, color: Colors.grey.shade500),
            const SizedBox(height: 12),
            Text(
              title,
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w900,
              ),
            ),
            const SizedBox(height: 6),
            Text(message, textAlign: TextAlign.center),
          ],
        ),
      ),
    );
  }
}

class ErrorState extends StatelessWidget {
  const ErrorState({super.key, required this.message, required this.onRetry});

  final String message;
  final VoidCallback onRetry;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.cloud_off, size: 56, color: Colors.grey.shade600),
            const SizedBox(height: 12),
            Text(
              'Connexion impossible',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w900,
              ),
            ),
            const SizedBox(height: 8),
            Text(message, textAlign: TextAlign.center),
            const SizedBox(height: 14),
            OutlinedButton.icon(
              onPressed: onRetry,
              icon: const Icon(Icons.refresh),
              label: const Text('Reessayer'),
            ),
          ],
        ),
      ),
    );
  }
}

class GreenMarketApi {
  final http.Client _client;

  GreenMarketApi({http.Client? client}) : _client = client ?? http.Client();

  Uri _uri(String path, [Map<String, String?> query = const {}]) {
    final base = Uri.parse(apiBaseUrl);
    final normalizedPath = '${base.path.replaceAll(RegExp(r'/$'), '')}/$path';
    return base.replace(
      path: normalizedPath,
      queryParameters: {
        for (final entry in query.entries)
          if (entry.value != null && entry.value!.isNotEmpty) entry.key: entry.value,
      },
    );
  }

  Future<CatalogPayload> fetchCatalog({String? search, String? category}) async {
    final responses = await Future.wait([
      _get(_uri('products', {'search': search, 'category': category})),
      _get(_uri('categories')),
    ]);

    final productsJson = responses[0];
    final categoriesJson = responses[1];
    return CatalogPayload(
      products: (productsJson['data'] as List).map((item) => Product.fromJson(item)).toList(),
      categories: (categoriesJson['data'] as List).map((item) => Category.fromJson(item)).toList(),
      total: (productsJson['meta']?['total'] as num?)?.toInt() ?? 0,
    );
  }

  Future<Product> fetchProduct(int id) async {
    final json = await _get(_uri('products/$id'));
    return Product.fromJson(json['data']);
  }

  Future<AuthSession> login({required String email, required String password}) async {
    final json = await _post(
      _uri('login'),
      body: {'email': email, 'password': password},
    );
    return AuthSession.fromJson(json);
  }

  Future<AuthSession> register({
    required String name,
    required String email,
    required String password,
    required String confirmation,
    String? phone,
    String? address,
  }) async {
    final json = await _post(
      _uri('register'),
      body: {
        'name': name,
        'email': email,
        'password': password,
        'password_confirmation': confirmation,
        'phone': phone,
        'address': address,
      },
    );
    return AuthSession.fromJson(json);
  }

  Future<void> createOrder(String token, List<CartItem> items) async {
    await _post(
      _uri('orders'),
      token: token,
      body: {
        'items': items
            .map((item) => {
                  'product_id': item.product.id,
                  'quantity': item.quantity,
                })
            .toList(),
      },
    );
  }

  Future<void> logout(String token) async {
    try {
      await _post(_uri('logout'), token: token, body: {});
    } catch (_) {
      // Local sign-out should still complete if the network call fails.
    }
  }

  Future<Map<String, dynamic>> _get(Uri uri) async {
    final response = await _client.get(uri, headers: _headers());
    return _decode(response);
  }

  Future<Map<String, dynamic>> _post(
    Uri uri, {
    required Map<String, dynamic> body,
    String? token,
  }) async {
    final response = await _client.post(
      uri,
      headers: _headers(token),
      body: jsonEncode(body),
    );
    return _decode(response);
  }

  Map<String, String> _headers([String? token]) => {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        if (token != null) 'Authorization': 'Bearer $token',
      };

  Map<String, dynamic> _decode(http.Response response) {
    final body = response.body.isEmpty ? <String, dynamic>{} : jsonDecode(response.body);
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return body is Map<String, dynamic> ? body : {'data': body};
    }
    if (body is Map<String, dynamic>) {
      final message = body['message'] ?? body['error'] ?? _firstValidationError(body['errors']);
      throw ApiException(message?.toString() ?? 'Erreur serveur ${response.statusCode}');
    }
    throw ApiException('Erreur serveur ${response.statusCode}');
  }

  String? _firstValidationError(dynamic errors) {
    if (errors is Map && errors.isNotEmpty) {
      final first = errors.values.first;
      if (first is List && first.isNotEmpty) return first.first.toString();
      return first.toString();
    }
    return null;
  }
}

class ApiException implements Exception {
  ApiException(this.message);
  final String message;

  @override
  String toString() => message;
}

class CatalogPayload {
  CatalogPayload({
    required this.products,
    required this.categories,
    required this.total,
  });

  final List<Product> products;
  final List<Category> categories;
  final int total;
}

class AuthSession {
  AuthSession({required this.token, required this.user});

  final String token;
  final User user;

  factory AuthSession.fromJson(Map<String, dynamic> json) {
    return AuthSession(
      token: json['token'].toString(),
      user: User.fromJson(json['user']),
    );
  }
}

class User {
  User({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    this.phone,
    this.address,
  });

  final int id;
  final String name;
  final String email;
  final String role;
  final String? phone;
  final String? address;

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: (json['id'] as num).toInt(),
      name: json['name']?.toString() ?? 'Utilisateur',
      email: json['email']?.toString() ?? '',
      role: json['role']?.toString() ?? 'buyer',
      phone: json['phone']?.toString(),
      address: json['address']?.toString(),
    );
  }
}

class Category {
  Category({
    required this.id,
    required this.name,
    required this.slug,
    this.icon,
  });

  final int id;
  final String name;
  final String slug;
  final String? icon;

  IconData get iconData {
    switch (slug) {
      case 'legumes':
        return Icons.eco_outlined;
      case 'fruits':
        return Icons.local_florist_outlined;
      case 'cereales':
        return Icons.grass_outlined;
      case 'produits-laitiers':
        return Icons.water_drop_outlined;
      case 'viandes':
        return Icons.restaurant_outlined;
      case 'oeufs':
        return Icons.radio_button_unchecked;
      case 'miel':
        return Icons.wb_sunny_outlined;
      default:
        return Icons.spa_outlined;
    }
  }

  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(
      id: (json['id'] as num).toInt(),
      name: json['name']?.toString() ?? 'Categorie',
      slug: json['slug']?.toString() ?? '',
      icon: json['icon']?.toString(),
    );
  }
}

class Product {
  Product({
    required this.id,
    required this.name,
    required this.price,
    required this.quantity,
    required this.unit,
    required this.userId,
    this.description,
    this.image,
    this.distance,
    this.category,
    this.seller,
  });

  final int id;
  final String name;
  final double price;
  final double quantity;
  final String unit;
  final int userId;
  final String? description;
  final String? image;
  final double? distance;
  final Category? category;
  final User? seller;

  String get sellerName => seller?.name ?? 'Producteur local';
  String? get sellerAddress => seller?.address;

  String? get absoluteImageUrl {
    if (image == null || image!.isEmpty) return null;
    if (image!.startsWith('http')) return image;
    final api = Uri.parse(apiBaseUrl);
    final root = '${api.scheme}://${api.host}${api.hasPort ? ':${api.port}' : ''}';
    if (image!.startsWith('/images/')) return '$root$image';
    return '$root/storage/$image';
  }

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: (json['id'] as num).toInt(),
      name: json['name']?.toString() ?? 'Produit',
      price: toDouble(json['price']),
      quantity: toDouble(json['quantity']),
      unit: json['unit']?.toString() ?? 'unite',
      userId: (json['user_id'] as num?)?.toInt() ?? 0,
      description: json['description']?.toString(),
      image: json['image']?.toString(),
      distance: json['distance'] == null ? null : toDouble(json['distance']),
      category: json['category'] is Map<String, dynamic> ? Category.fromJson(json['category']) : null,
      seller: json['user'] is Map<String, dynamic> ? User.fromJson(json['user']) : null,
    );
  }
}

class CartStore extends ChangeNotifier {
  final Map<int, CartItem> _items = {};

  List<CartItem> get items => _items.values.toList(growable: false);
  int get totalItems => _items.values.fold(0, (sum, item) => sum + item.quantity.round());
  double get total => _items.values.fold(0, (sum, item) => sum + item.total);

  void add(Product product) {
    final existing = _items[product.id];
    if (existing == null) {
      _items[product.id] = CartItem(product: product, quantity: 1);
    } else {
      existing.quantity += 1;
    }
    notifyListeners();
  }

  void decrease(Product product) {
    final existing = _items[product.id];
    if (existing == null) return;
    existing.quantity -= 1;
    if (existing.quantity <= 0) {
      _items.remove(product.id);
    }
    notifyListeners();
  }

  void clear() {
    _items.clear();
    notifyListeners();
  }
}

class CartItem {
  CartItem({required this.product, required this.quantity});

  final Product product;
  double quantity;
  double get total => product.price * quantity;
}

double toDouble(dynamic value) {
  if (value is num) return value.toDouble();
  return double.tryParse(value?.toString() ?? '') ?? 0;
}

String formatMoney(double value) {
  return '${formatNumber(value)} FCFA';
}

String formatNumber(double value) {
  if (value == value.roundToDouble()) {
    return value.round().toString();
  }
  return value.toStringAsFixed(2);
}

import 'package:flutter_test/flutter_test.dart';

import 'package:mobile_app/main.dart';

void main() {
  testWidgets('GreenMarket app starts on the catalog', (tester) async {
    await tester.pumpWidget(const GreenMarketApp());

    expect(find.text('GreenMarket'), findsOneWidget);
    expect(find.text('Produits frais pres de chez vous'), findsOneWidget);
    expect(find.text('Marche'), findsOneWidget);
    expect(find.text('Panier'), findsOneWidget);
  });
}

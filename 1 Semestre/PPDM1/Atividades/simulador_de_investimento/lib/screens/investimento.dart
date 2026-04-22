import 'package:flutter/material.dart';

class InvestimentoScreen extends StatefulWidget {
  const InvestimentoScreen({super.key});

  @override
  State<InvestimentoScreen> createState() => _InvestimentoScreenState();
}

class _InvestimentoScreenState extends State<InvestimentoScreen> {
  final TextEditingController valorController = TextEditingController();
  final TextEditingController mesesController = TextEditingController();
  final TextEditingController jurosController = TextEditingController();

  String totalSemJuros = "0.00";
  String totalComJuros = "0.00";

  void calcular() {
    double valor = double.tryParse(valorController.text) ?? 0;
    int meses = int.tryParse(mesesController.text) ?? 0;
    double juros = (double.tryParse(jurosController.text) ?? 0) / 100;

    double montante = 0;

    for (int i = 0; i < meses; i++) {
      montante = (montante + valor) * (1 + juros);
    }

    setState(() {
      totalSemJuros = (valor * meses).toStringAsFixed(2);
      totalComJuros = montante.toStringAsFixed(2);
    });

    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text("Resultado"),
        content: Text(
          "Valor total com juros compostos:\nR\$ $totalComJuros",
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("Ok"),
          )
        ],
      ),
    );
  }

  Widget campo(String hint, TextEditingController controller) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      child: TextField(
        controller: controller,
        keyboardType: TextInputType.number,
        decoration: InputDecoration(
          filled: true,
          fillColor: Colors.white.withOpacity(0.9),
          hintText: hint,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: const BorderSide(color: Colors.black26),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Positioned.fill(
            child: Image.asset(
              "assets/fundoinvestimento.webp",
              fit: BoxFit.cover,
            ),
          ),
          Positioned.fill(
            child: Container(
              color: Colors.white.withOpacity(0.85),
            ),
          ),
          SafeArea(
            child: Column(
              children: [
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(16),
                  color: Colors.orange[700],
                  child: const Text(
                    "Simulador de Investimentos",
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.white, fontSize: 18),
                  ),
                ),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text("Investimento Mensal:"),
                        campo("Digite o valor", valorController),
                        const SizedBox(height: 10),
                        const Text("Número de meses:"),
                        campo("Quantos meses deseja investir", mesesController),
                        const SizedBox(height: 10),
                        const Text("Taxa de juros ao mês:"),
                        campo("Digite a taxa de juros", jurosController),
                        const SizedBox(height: 20),
                        SizedBox(
                          width: 160,
                          child: ElevatedButton(
                            onPressed: calcular,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.black,
                              foregroundColor: Colors.white,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(20),
                              ),
                            ),
                            child: const Text("Calcular"),
                          ),
                        ),
                        const SizedBox(height: 30),
                        Text(
                          "Valor total sem juros: R\$ $totalSemJuros",
                          style: const TextStyle(fontWeight: FontWeight.w500),
                        ),
                        const SizedBox(height: 10),
                        Text(
                          "Valor total com juros compostos: R\$ $totalComJuros",
                          style: const TextStyle(fontWeight: FontWeight.w500),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
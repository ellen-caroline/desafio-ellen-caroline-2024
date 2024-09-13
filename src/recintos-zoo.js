class RecintosZoo {
    // informações dos recintos disponíveis
    constructor() {
        this.recintos = [
            {
                numero: 1, bioma: 'savana', tamanhoTotal: 10, animais:
                    [{ especie: 'MACACO', quantidade: 3, tamanho: 1 }]
            },
            {
                numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais:
                    []
            },
            {
                numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais:
                    [{ especie: 'GAZELA', quantidade: 1, tamanho: 2 }]
            },
            {
                numero: 4, bioma: 'rio', tamanhoTotal: 8, animais:
                    []
            },
            {
                numero: 5, bioma: 'savana', tamanhoTotal: 9, animais:
                    [{ especie: 'LEAO', quantidade: 1, tamanho: 3 }]
            }
        ];
    }

    analisaRecintos(animal, quantidadeAnimal) {
        // verifica se a quantidade é válida
        if (quantidadeAnimal <= 0 || isNaN(quantidadeAnimal)) {
            return { recintosViaveis: false, erro: "Quantidade inválida" };
        }

        let infoAnimal;
        let resultado;

        switch (animal) {
            case 'LEAO':
                infoAnimal = { tamanho: 3, biomas: ['savana'], carnivoro: true };
                break;
            case 'LEOPARDO':
                infoAnimal = { tamanho: 2, biomas: ['savana'], carnivoro: true };
                break;
            case 'CROCODILO':
                infoAnimal = { tamanho: 3, biomas: ['rio'], carnivoro: true };
                break;
            case 'MACACO':
                infoAnimal = { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false };
                break;
            case 'GAZELA':
                infoAnimal = { tamanho: 2, biomas: ['savana'], carnivoro: false };
                break;
            case 'HIPOPOTAMO':
                infoAnimal = { tamanho: 4, biomas: ['savana', 'rio', 'savana e rio'], carnivoro: false };
                break;
            default:
                return { recintosViaveis: null, erro: "Animal inválido" };
        }

        const recintosViaveis = [];

        this.recintos.forEach((recinto) => {
            let { tamanhoTotal, bioma, animais } = recinto;
            let carnivorosPresentes = Boolean;
            let espacoOcupado = Number;
            let outrasEspeciesPresentes = false;
            let espacoDisponivel = Number;
            let espacoAConsumir = Number;

            // verifica se o animal pode ir no bioma
            if (!infoAnimal.biomas.includes(bioma)) {
                return; // pula esse recinto
            }

            // verifica se tem carnívoros no recinto
            carnivorosPresentes = recinto.animais.reduce((acc, animal) => {
                const { carnivoro } = animal;
                if (carnivoro == true) {
                    return acc + carnivoro;
                }
            }, 0)

            // somar animais no recinto
            espacoOcupado = recinto.animais.reduce((acc, animal) => {
                const { quantidade, tamanho } = animal;
                espacoOcupado = quantidade * tamanho;
                return acc + espacoOcupado;
            }, 0)

            espacoDisponivel = espacoOcupado - tamanhoTotal;
            espacoAConsumir = infoAnimal.tamanho * quantidadeAnimal;

            if (espacoDisponivel < espacoAConsumir) {
                resultado = { recintosViaveis: null, erro: "Não há recinto viável" }
            }
        })
        return resultado;
    }
}

export { RecintosZoo as RecintosZoo };

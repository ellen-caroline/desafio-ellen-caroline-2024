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

        // percorre pelos recintos
        this.recintos.forEach((recinto) => {
            let { tamanhoTotal, bioma, animais } = recinto;
            let carnivorosPresentes = Boolean;
            let espacoOcupado = Number;
            let outrasEspeciesPresentes = false;

            // verifica o espaço ocupado pelos animais no recinto
            animais.forEach(animalExistente => {
                espacoOcupado += animalExistente.quantidade * animalExistente.tamanho;
                if (['LEAO', 'LEOPARDO', 'CROCODILO'].includes(animalExistente.especie)) {
                    carnivorosPresentes = true;
                } else {
                    outrasEspeciesPresentes = true;
                }
            });

            // verifica se tem espaço disponível para o novo animal
            let espacoDisponivel = espacoOcupado - tamanhoTotal;
            let espacoAConsumir = infoAnimal.tamanho * quantidadeAnimal;

            /************** regras de concivência **************/
            // carnívoros não podem conviver com outras espécies
            if (infoAnimal.carnivoro && outrasEspeciesPresentes) {
                return; 
            }

            // carnívoros só podem habitar com a própria espécie
            if (infoAnimal.carnivoro) {
                for (const { especie } of animais) {
                    if (['LEAO', 'LEOPARDO', 'CROCODILO'].includes(especie) && especie !== animal) {
                        return;
                    }
                }
            }

            // macacos precisam de pelo menos outro animal no recinto para se sentir confortável
            if (infoAnimal.especie === 'MACACO' && animais.length === 0) {
                return;
            }

            // se tem espécies distintas, considerar espaço adicional
            if (animais.length > 0 && infoAnimal.carnivoro === false) {
                espacoDisponivel -= 1;
            }

            // verifica se tem espaço disponível
            if (espacoDisponivel >= espacoAConsumir) {
                recintosViaveis.push(`Recinto ${numero} ("espaço livre: ${espacoDisponivel - espacoAConsumir} total: ${tamanhoTotal}")`);
            }
        });

        if (recintosViaveis.length === 0) {
            return { recintosViaveis: null, erro: "Não há recinto viável" };
        }

        return {recintosViaveis}};
}


export { RecintosZoo as RecintosZoo };

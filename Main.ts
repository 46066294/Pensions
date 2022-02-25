
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


class Desgravacio {

    private brut = 0;
    private deduccionMaxPersona = 1500;
    private deduccionMaxEmpresa = 8500;
    private deduccionPersona = 0;
    private deduccionEmpresa = 0;
  
    constructor(){}
  
    setBrut(brut: number): any {
        this.brut = brut;
    }

    setAportacioPersona(plaPersona: number): any {
      if(plaPersona >= this.deduccionMaxPersona) this.deduccionPersona = this.deduccionMaxPersona;
      else this.deduccionPersona = plaPersona;
    }
  
    setAportacioEmpresa(plaEmpresarial: number): any {
        if(plaEmpresarial >= this.deduccionMaxEmpresa) this.deduccionEmpresa = this.deduccionMaxEmpresa;
        else this.deduccionEmpresa = plaEmpresarial;
    }

    dinersDesgravats(brut:number, deduccionPersona:number, deduccionEmpresa:number):number{
        let totalDeduit: number = deduccionPersona + deduccionEmpresa;
        let baseImponible: number = brut - totalDeduit;
        let tipusIRPF: number = this.calculaIRPF(baseImponible); // %

        return (totalDeduit * tipusIRPF) / 100;
    }

    mostrar(){
        let eurus:number = this.dinersDesgravats(this.brut, this.deduccionPersona, this.deduccionEmpresa)
        console.log('Diners desgravats: ' + eurus);
    }


    calculaIRPF(baseImponible: number): number{
        /*
        0 a 12450     19%
        12450 a 20200 24%
        20200 a 35200 30%
        35200 a 60000 37%
        */
       if(baseImponible >= 0 && baseImponible < 12450) return 19;
       else if(baseImponible >= 12450 && baseImponible < 20200) return 24;
       else if(baseImponible >= 0 && baseImponible < 12450) return 30;
       else if(baseImponible >= 0 && baseImponible < 12450) return 37;
       else return 0;

    }
    
}

const desgravacio = new Desgravacio();

let numopcion: string = '';
let brut: number = 0;
let plaPersona: number = 0;
let plaEmpresarial: number = 0;

rl.question('Sel·l ecciona pla d inversió al que vas a aportar:\n1. Pla de pensions de persona física\n2. Pla de pensions empresarial\n3. Els dos ', (opcio: String) => {
    const numopcion: number = +opcio;
    console.log(`Opcio sel·leccionada es ${numopcion} `);
    if(numopcion == 1){
        console.log(`Quants diners has guanyat aquest any? (€ bruts anuals)`);
        rl.question('-->', (brutAnual: string) => { 
            brut = parseFloat(brutAnual); 
            desgravacio.setBrut(brut);
            console.log(`Quants diners aportats al pla de persona física?`);
            rl.question('-->', (plaP: string) => { 
                plaPersona = parseFloat(plaP); 
                desgravacio.setAportacioPersona(plaPersona);
                desgravacio.mostrar();
                rl.close(); 
            });
            
        });
    }
    else if(numopcion == 2){
        console.log(`Quants diners has guanyat aquest any? (€ bruts anuals)`);
        rl.question('-->', (brutAnual: string) => { 
            brut = parseFloat(brutAnual); 
            desgravacio.setBrut(brut);
            console.log(`Quants diners aportats al pla empresarial?`);
            rl.question('-->', (plaE: string) => {
                plaEmpresarial = parseFloat(plaE);
                desgravacio.setAportacioEmpresa(plaEmpresarial);
                desgravacio.mostrar();
                rl.close();
            });
        });
        
    }
    else if(numopcion == 3){
        rl.question('Quants diners has guanyat aquest any? (€ bruts anuals)', (brutAnual: string) => { 
            brut = parseFloat(brutAnual); 
            desgravacio.setBrut(brut);
            
            rl.question('Quants diners aportats al pla de persona física?', (plaP: string) => { 
                plaPersona = parseFloat(plaP); 
                desgravacio.setAportacioPersona(plaPersona);

                rl.question('Quants diners aportats al pla empresarial?', (plaE: string) => {
                    plaEmpresarial = parseFloat(plaE);
                    desgravacio.setAportacioEmpresa(plaEmpresarial);
                    desgravacio.mostrar();
                    rl.close();
                });
            });
            
        });
    }
    
});


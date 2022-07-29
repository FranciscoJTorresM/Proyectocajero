var cuentas = [{
  nombre: "Francisco", saldo: 1000, password: "alpha",
},
{
  nombre: "Teresa",saldo: 500,password: "teres@",
},
  {
    nombre: "Diego", saldo: 250, password: "dieg0",     
  },

];  
var cuentaTotal = null;  
 for (let i = 0; i < cuentas.length; i++) {    
    let cuenta = document.createElement("div");
    cuenta.classList.add("text-center"); 
    cuenta.classList.add("col-sm-12"); 
    cuenta.classList.add("col-md-6"); 
    cuenta.classList.add("col-lg-3"); 
    cuenta.innerHTML = `  
        <button class="btn  btn-primary" id="${cuentas[i].nombre}" style="width: 10rem;" onClick="cuentaSelect('${i}');">

       
              <h5 class="card-title text-center">${cuentas[i].nombre}</h5>
              </div>
          
        </button>
    `; 
  
    document.getElementById("grid-cuentas").appendChild(cuenta); 
  }
  
//    saldo 
const consultar = () => {
    let saldo = cuentas[cuentaTotal].saldo; 
    let display = document.getElementById("saldo"); 
    let screen = document.querySelectorAll(".activa"); 
    screen[0].classList.add("invisible"); 
    screen[0].classList.remove("activa"); 
    consultScreen.classList.remove("invisible");
    consultScreen.classList.add("activa"); 
    display.innerText = `Tu saldo es $${saldo}`; 
  };
  
  //Deposito
  const depositar = (valor) => {
    ingreso.classList.remove("is-invalid"); 
    if (verifyValue(valor)) {      
      valor = parseFloat(valor); 
      let temp = cuentas[cuentaTotal].saldo + valor; 
      if (temp <= 2000) {        
        cuentas[cuentaTotal].saldo += valor; 
        ingreso.value = "";
        consultar(); 
      } else {        
        errors("Recuerda que tu saldo no puede ser mayor a $2000", "control"); 
        ingreso.value = "";
        ingreso.focus();
      }
    } else {     
      ingreso.classList.add("is-invalid"); 
    }
  };
  
  //Retiro 
  const retirar = (valor) => {
    egreso.classList.remove("is-invalid"); 
    if (verifyValue(valor)) {      
      valor = parseFloat(valor);
      let temp = cuentas[cuentaTotal].saldo - valor; 
      if (temp >= 10) {        
        cuentas[cuentaTotal].saldo -= valor; 
        egreso.value = "";
        consultar(); 
      } else {       
        errors("Recuerda que tu saldo no puede ser menor a $10", "control2"); 
        egreso.value = "";
        egreso.focus();
      }
    } else {     
      egreso.classList.add("is-invalid"); 
    }
  };  
  
  //Verifica que sea un numero entero y mayor a cero
  const verifyValue = (valor) => {
    valor = parseFloat(valor); 
    if (valor > 0 && Number.isInteger(valor)) {      
      return true;
    } else {      
      return false;
    }
  }; 
  
  //Muestra un mensaje de error sobre depositos y retiros
  
  const errors = (mensaje, element) => {
    var wrapper = document.createElement("div"); 
    wrapper.innerHTML =
      '<div class="alert alert-danger alert-dismissible" role="alert">' +
      mensaje +
      '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'; 
    document.getElementById(element).append(wrapper); 
  };  
  // Regresa al menu 
  const returnMenu = () => {
    let elements = document.querySelectorAll(".activa"); 
    elements[0].classList.remove("activa"); 
    elements[0].classList.add("invisible"); 
    menuScreen.classList.add("activa"); 
    menuScreen.classList.remove("invisible"); 
  };
 
  
  // Regresa a cuentas
  const exit = () => {
    let visibleScreen = document.querySelectorAll(".activa"); 
    visibleScreen[0].classList.remove("activa");
    visibleScreen[0].classList.add("invisible");
    accountScreen.classList.remove("invisible"); 
    cuentaTotal = null;
    let otraCuenta = document.getElementsByClassName("cuenta_activa"); 
    if (otraCuenta.length > 0) {
      otraCuenta[0].classList.remove("cuenta_activa"); 
    }
    password.value = ""; 
    document.getElementById("contrasena").classList.add("invisible");
  };

  
  // valida cuenta activa 
  const cuentaSelect = (index) => {
    password.classList.remove("is-invalid"); 
    password.value = ""; 
    cuentaTotal = index; 
    let otraCuenta = document.getElementsByClassName("cuenta_activa"); 
    if (otraCuenta.length > 0) {      
      otraCuenta[0].classList.remove("cuenta_activa"); 
    }
    let element = document.getElementById(cuentas[index].nombre); 
    element.classList.add("cuenta_activa"); 
    document.getElementById("contrasena").classList.remove("invisible"); 
    password.focus(); 
  };
 
  
 //comprueba que tecla se presiona
  const checkKey = (e) => {
    if (e.key === "Enter") {     
      let id = e.target.id; 
      validar(e.target.value, id);
    }
  };  
  //valida que tipo de input se esta utilizando
  const validar = (valor, id) => {
    if (id == "password") {      
      if (cuentas[cuentaTotal].password === valor) {        
        accountScreen.classList.add("invisible"); 
        menuScreen.classList.remove("invisible");
        menuScreen.classList.add("activa"); 
      } else {      
        password.classList.add("is-invalid"); 
      }
      password.value = ""; 
    } else if (id == "ingreso") {      
      depositar(valor); 
    } else if (id == "egreso") {     
      retirar(valor); 
    }
  };
  

  const accountScreen = document.getElementById("account_screen"); 
  const menuScreen = document.getElementById("menu_screen"); 
  const consultScreen = document.getElementById("consult_screen"); 
  const depositScreen = document.getElementById("deposit_screen");
  const withdrawScreen = document.getElementById("withdraw_screen"); 

  const password = document.getElementById("password"); 
  const ingreso = document.getElementById("ingreso"); 
  const egreso = document.getElementById("egreso");    

  const consultarSaldo = document.getElementById("consultar_saldo"); 
  consultarSaldo.addEventListener("click", consultar);  

  const deposito = document.getElementById("deposito"); 
  deposito.addEventListener("click", () => {
    menuScreen.classList.remove("activa"); 
    menuScreen.classList.add("invisible"); 
    depositScreen.classList.remove("invisible"); 
    depositScreen.classList.add("activa"); 
    ingreso.focus(); 
  }); 
  
  const retiro = document.getElementById("retiro"); 
  retiro.addEventListener("click", () => {
    menuScreen.classList.remove("activa"); 
    menuScreen.classList.add("invisible"); 
    withdrawScreen.classList.remove("invisible"); 
    withdrawScreen.classList.add("activa"); 
    egreso.focus();
  });
  
  
  const returns = document.querySelectorAll("#return"); 
  returns.forEach((element) => {
    
    element.addEventListener("click", returnMenu); 
  });  
  
  const exits = document.querySelectorAll("#exit"); 
  exits.forEach((element) => {
   
    element.addEventListener("click", exit); 
  });
  

 

  

 
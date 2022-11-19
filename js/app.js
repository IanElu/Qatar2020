
Vue.component('card-gambler', {
    props: ['gambler'],
    data: function () {
      return {
        count: 0
      }
    },
    methods:{
        fnDeleteGambler(name){
            this.$root.fnDeleteGambler(name);            
        }
    },
    template:  `
        <div class="card">
            <img src="images/img_avatar.png" alt="Avatar" style="width:100%"/>
            <div class="card-title">    
                <h4>
                    <b>{{gambler.name}}</b>
                </h4>
            </div>
            <div class="flag">
                <div v-for="elem in gambler.data" style="display:flex;align-items:center;">
                    <div>
                        <img :src="elem.flag" :title="elem.country" :alt="elem.country" />
                    </div>
                    <div>
                        <p>{{elem.country}}</p>
                    </div>
                </div>
            </div>
            <div class="actionDelete" @click="fnDeleteGambler(gambler.name)" v-show="gambler.data.length == 0">
                <a class="css-button">
                    <span class="css-button-icon"><i class="fa fa-trash" aria-hidden="true"></i></span>
                    <span class="css-button-text">Eliminar</span>
                </a>            
            </div>
        </div>
    </div>`
});

var app = new Vue({
    el: '#app',
    methods: { 
        fnDeleteGambler(name){        
            this.listGamblers = this.listGamblers.filter((item) => { return item.name.toLowerCase() != name.toLowerCase() });
        },
        fnResetTeamNums(){
            this.teamNums = Array.from({length: this.teams.length}, (_, i) => i + 1);
        },
        fnResetSelect(){
            this.listGamblers = [];
        }, 
        fnAddGambler(){            
            if(this.gamblerName){                            
                if(this.listGamblers.length < this.numGamblers)
                {     
                    this.showRight = true;
                    let arrElems = this.listGamblers.filter((item) => { return item.name.toLowerCase() == this.gamblerName.toLowerCase() });             
                    if(arrElems.length == 0){
                        this.listGamblers.push({ name: this.gamblerName.toLowerCase(), data: []});                                            
                        this.listGamblersBack.push({ name: this.gamblerName.toLowerCase(), data: []});  
                    }    
                    else 
                    {
                        alert("Este apostador ya fue registrado");
                    }                
                }
                this.gamblerName = "";
            }
        },                 
        fnRandom: function(length){
            return Math.floor(Math.random() * length);
        },        
        fnLottery(){                          
            this.fnResetTeamNums();          
            let teams4Participant = Math.floor(this.teamNums.length/this.numGamblers);
            this.listGamblers = this.listGamblers.filter(function(obj){ return obj.name.toLowerCase() != "none" }) ;
            for(let index in this.listGamblers) {                                                                
                let objGambler = this.listGamblers[index];
                objGambler.data = [];
                for(var j= 1; j <= teams4Participant; j++) //numeros por participante
                {
                    let pos = this.fnRandom(this.teamNums.length);
                    let elementSelected = this.teams.filter((item)=>{ return item.id == this.teamNums[pos]; });    
                    this.teamNums.splice(pos,1);                                                    
                    objGambler.data.push(elementSelected[0]);
                }                  
            }  
            if(this.teamNums.length > 0){              
                let objNone = { name : "None", data: []};
                for(var k = 0; k < this.teamNums.length; k++)
                {
                    objNone.data.push(this.teams.filter((item)=>{ return item.id == this.teamNums[k]; })[0]);
                }  
                this.listGamblers.push(objNone);
            }                                
        },
        fnFecth: function(url, fncb){
            fetch(url)
            .then(response => response.json())
            .then(data =>{                        
                if(fncb){
                    fncb(data);
                }
            });
        }
    },
    computed: {
        showAdd(){
            return this.listGamblers.length < this.numGamblers;
        },
        showCreate(){
            return this.listGamblers.length >= this.numGamblers;
        },
    },
    data: { 
        gamblerName: "",        
        teamNums: [],        
        listGamblers: [],        
        numGamblers:2,  
        showRight: false,    
        teams: [{
            id:1,
            country: "QATAR",
            group: "A",
            flag: "images/flags/4x3/qa.svg"
        },{
            id:2,
            country: "ECUADOR",
            group: "A",
            flag: "images/flags/4x3/ec.svg"
        },{
            id:3,
            country: "SENEGAL",
            group: "A",
            flag: "images/flags/4x3/sn.svg"
        },{
            id:4,
            country: "PAISES BAJOS",
            group: "A",
            flag: "images/flags/4x3/nl.svg"
        },{
            id:5,
            country: "INGLATERRA",
            group: "B",
            flag: "images/flags/4x3/gb-eng.svg"
        },{
            id:6,
            country: "IRAN",
            group: "B",
            flag: "images/flags/4x3/ir.svg"
        },{
            id:7,
            country: "EEUU",
            group: "B",
            flag: "images/flags/4x3/us.svg"
        },{
            id:8,
            country: "GALES",
            group: "B",
            flag: "images/flags/4x3/gb-wls.svg"
        },{
            id:9,
            country: "ARGENTINA",
            group: "C",
            flag: "images/flags/4x3/ar.svg"
        },{
            id:10,
            country: "ARABIA S.",
            group: "C",
            flag: "images/flags/4x3/sa.svg"
        },{
            id:11,
            country: "MEXICO",
            group: "C",
            flag: "images/flags/4x3/mx.svg"
        },{
            id:12,
            country: "POLONIA",
            group: "C",
            flag: "images/flags/4x3/pl.svg"
        },{
            id:13,
            country: "FRANCIA",
            group: "D",
            flag: "images/flags/4x3/fr.svg"
        },{
            id:14,
            country: "AUSTRALIA",
            group: "D",
            flag: "images/flags/4x3/au.svg"
        },{
            id:15,
            country: "DINAMARCA",
            group: "D",
            flag: "images/flags/4x3/dk.svg"
        },{
            id:16,
            country: "TUNEZ",
            group: "D",
            flag: "images/flags/4x3/tn.svg"
        },{
            id:17,
            country: "ESPAÑA",
            group: "E",
            flag: "images/flags/4x3/es.svg"
        },{
            id:18,
            country: "COSTA RICA",
            group: "E",
            flag: "images/flags/4x3/cr.svg"
        },{
            id:19,
            country: "ALEMANIA",
            group: "E",
            flag: "images/flags/4x3/de.svg"
        },{
            id:20,
            country: "JAPON",
            group: "E",
            flag: "images/flags/4x3/jp.svg"
        },{
            id:21,
            country: "BELGICA",
            group: "F",
            flag: "images/flags/4x3/be.svg"
        },{
            id:22,
            country: "CANADA",
            group: "F",
            flag: "images/flags/4x3/ca.svg"
        },{
            id:23,
            country: "MARRUECOS",
            group: "F",
            flag: "images/flags/4x3/ma.svg"
        },{
            id:24,
            country: "CROACIA",
            group: "F",
            flag: "images/flags/4x3/hr.svg"
        },{
            id:25,
            country: "BRASIL",
            group: "G",
            flag: "images/flags/4x3/br.svg"
        },{
            id:26,
            country: "SERBIA",
            group: "G",
            flag: "images/flags/4x3/rs.svg"
        },{
            id:27,
            country: "SUIZA",
            group: "G",
            flag: "images/flags/4x3/ch.svg"
        },{
            id:28,
            country: "CAMERUN",
            group: "G",
            flag: "images/flags/4x3/cm.svg"
        },{
            id:29,
            country: "PORTUGAL",
            group: "H",
            flag: "images/flags/4x3/pt.svg"
        },{
            id:30,
            country: "GHANA",
            group: "H",
            flag: "images/flags/4x3/gh.svg"
        },{
            id:31,
            country: "URUGUAY",
            group: "H",
            flag: "images/flags/4x3/uy.svg"
        },{
            id:32,
            country: "COREA DEL SUR",
            group: "H",
            flag: "images/flags/4x3/kr.svg"
        }]
    }
}); 

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
            let arr = [];             
            this.teams = this.teams.filter(function(team){
                if(team.eliminate == false){
                    arr.push(team.id);
                }
                return team.eliminate == false;
            });
            this.teamNums = arr;
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
                        this.gamblerName = "";
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
            let objThis = this;
            this.showLoading = true;                   
            this.fnResetTeamNums();          
            let teams4Participant = Math.floor(this.teams.length/this.numGamblers);
            this.listGamblers = this.listGamblers.filter(function(obj){ return obj.name.toLowerCase() != "none" }) ;            
            for(let index in this.listGamblers) {                                                                
                let objGambler = this.listGamblers[index];
                objGambler.data = [];
                for(var j= 1; j <= teams4Participant; j++) //numeros por participante
                {                    
                    let pos = this.fnRandom(this.teamNums.length);                    
                    let elementSelected = this.teams.filter(function(item){ 
                        return item.id == objThis.teamNums[pos]; 
                    });    
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
            setTimeout(function(){
                objThis.showLoading = false;
            }, 1000);
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
        showLoading: false,
        showRight: false,    
        teams: [{
            id:1,
            country: "QATAR",
            group: "A",
            flag: "images/flags/4x3/qa.svg",
            eliminate: true
        },{
            id:2,
            country: "ECUADOR",
            group: "A",
            flag: "images/flags/4x3/ec.svg",
            eliminate: true
        },{
            id:3,
            country: "SENEGAL",
            group: "A",
            flag: "images/flags/4x3/sn.svg",
            eliminate: false
        },{
            id:4,
            country: "PAISES BAJOS",
            group: "A",
            flag: "images/flags/4x3/nl.svg",
            eliminate: false
        },{
            id:5,
            country: "INGLATERRA",
            group: "B",
            flag: "images/flags/4x3/gb-eng.svg",
            eliminate: false
        },{
            id:6,
            country: "IRAN",
            group: "B",
            flag: "images/flags/4x3/ir.svg",
            eliminate: true
        },{
            id:7,
            country: "EEUU",
            group: "B",
            flag: "images/flags/4x3/us.svg",
            eliminate: false
        },{
            id:8,
            country: "GALES",
            group: "B",
            flag: "images/flags/4x3/gb-wls.svg",
            eliminate: true
        },{
            id:9,
            country: "ARGENTINA",
            group: "C",
            flag: "images/flags/4x3/ar.svg",
            eliminate: false
        },{
            id:10,
            country: "ARABIA S.",
            group: "C",
            flag: "images/flags/4x3/sa.svg",
            eliminate: true
        },{
            id:11,
            country: "MEXICO",
            group: "C",
            flag: "images/flags/4x3/mx.svg",
            eliminate: true
        },{
            id:12,
            country: "POLONIA",
            group: "C",
            flag: "images/flags/4x3/pl.svg",
            eliminate: false
        },{
            id:13,
            country: "FRANCIA",
            group: "D",
            flag: "images/flags/4x3/fr.svg",
            eliminate: false
        },{
            id:14,
            country: "AUSTRALIA",
            group: "D",
            flag: "images/flags/4x3/au.svg",
            eliminate: false
        },{
            id:15,
            country: "DINAMARCA",
            group: "D",
            flag: "images/flags/4x3/dk.svg",
            eliminate: true
        },{
            id:16,
            country: "TUNEZ",
            group: "D",
            flag: "images/flags/4x3/tn.svg",
            eliminate: true
        },{
            id:17,
            country: "ESPAÑA",
            group: "E",
            flag: "images/flags/4x3/es.svg",
            eliminate: false
        },{
            id:18,
            country: "COSTA RICA",
            group: "E",
            flag: "images/flags/4x3/cr.svg",
            eliminate: true
        },{
            id:19,
            country: "ALEMANIA",
            group: "E",
            flag: "images/flags/4x3/de.svg",
            eliminate: true
        },{
            id:20,
            country: "JAPON",
            group: "E",
            flag: "images/flags/4x3/jp.svg",
            eliminate: false
        },{
            id:21,
            country: "BELGICA",
            group: "F",
            flag: "images/flags/4x3/be.svg",
            eliminate: true
        },{
            id:22,
            country: "CANADA",
            group: "F",
            flag: "images/flags/4x3/ca.svg",
            eliminate: true
        },{
            id:23,
            country: "MARRUECOS",
            group: "F",
            flag: "images/flags/4x3/ma.svg",
            eliminate: false
        },{
            id:24,
            country: "CROACIA",
            group: "F",
            flag: "images/flags/4x3/hr.svg",
            eliminate: false
        },{
            id:25,
            country: "BRASIL",
            group: "G",
            flag: "images/flags/4x3/br.svg",
            eliminate: false
        },{
            id:26,
            country: "SERBIA",
            group: "G",
            flag: "images/flags/4x3/rs.svg",
            eliminate: true
        },{
            id:27,
            country: "SUIZA",
            group: "G",
            flag: "images/flags/4x3/ch.svg",
            eliminate: false
        },{
            id:28,
            country: "CAMERUN",
            group: "G",
            flag: "images/flags/4x3/cm.svg",
            eliminate: true
        },{
            id:29,
            country: "PORTUGAL",
            group: "H",
            flag: "images/flags/4x3/pt.svg",
            eliminate: false
        },{
            id:30,
            country: "GHANA",
            group: "H",
            flag: "images/flags/4x3/gh.svg",
            eliminate: true
        },{
            id:31,
            country: "URUGUAY",
            group: "H",
            flag: "images/flags/4x3/uy.svg",
            eliminate: true
        },{
            id:32,
            country: "COREA DEL SUR",
            group: "H",
            flag: "images/flags/4x3/kr.svg",
            eliminate: false
        }]
    }
}); 
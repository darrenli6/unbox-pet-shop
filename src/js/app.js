App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  // 首先判断当前网络是否有web3注入
  initWeb3: async function() {
    /*
     * Replace me...
     */
    if (typeof web3 !='undefined'){
      App.web3Provider = web3.currentProvider; // 已经注入
    }else{
      App.web3Provider= new Web3.providers.HttpProvider("http://127.0.0.1:8545")
    }
    web3 =new Web3(App.web3Provider)



    return App.initContract();
  },

  initContract: function() {
    /*
     * Replace me...
     */

    $.getJSON('Adoption.json',function(data){
      var AdoptionArtifact =data;
      App.contracts.Adoption=TruffleContract(AdoptionArtifact); // 合约实例
      // 合约初始化
      App.contracts.Adoption.setProvider(App.web3Provider);
      return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  // 标记为已经领养状态
  markAdopted: function(adopters,account) {
    /*
     * Replace me...
     */
    
    var adoptionInstance;

    //获取部署实例
    App.contracts.Adoption.deployed().then(function(instance){
         adoptionInstance=instance;
         return adoptionInstance.getAdopters.call();
    }).then(function(adopters){
        //console.log(adopters);
        // 遍历 判断每一个宠物是否已经被领养
        for(i=0;i<adopters.length;i++){
          if(adopters[i] != "0x0000000000000000000000000000000000000000"){
             
               $(".panel-pet").eq(i).find("button").text("success").attr("disabled",true);
          } 
        }
    }).catch(function(err){
      console.log(err);
    });

    


  },
  // 领养函数
  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
    
    var adoptionInstance;

    web3.eth.getAccounts(function(error,accounts){
       if(error){
         console.log(error);
       }


       var account =accounts[0];

       console.log(accounts)

       var adoptionInstance;

       //获取部署实例
       App.contracts.Adoption.deployed().then(function(instance){
         adoptionInstance=instance;

         //执行领养宠物
         return adoptionInstance.adopt(petId,{from:account});
         

       }).then(function(result){
         return App.markAdopted(); //将宠物做标记为已经领养
       }).catch(function(err){
         console.log(err.message)
       })


    }); 


  }

};

$(function() {
  // 加载
  $(window).load(function() {
    App.init();
  });
});

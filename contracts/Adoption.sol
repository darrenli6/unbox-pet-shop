pragma solidity ^0.4.0;

contract Adoption{

    address[16] public pet;

    function adopt(uint petId ) public returns(uint){

      require(petId>=0 && petId <=15);
      pet[petId]=msg.sender;

      return petId;
    }


    function getAdopters() public view returns (address[16]){
       return pet ;
    }


}
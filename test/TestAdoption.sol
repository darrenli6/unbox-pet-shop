pragma solidity ^0.4.0;

import "truffle/DeployedAddresses.sol";
import "truffle/Assert.sol";
import "../contracts/Adoption.sol";


contract TestAdoption{

    Adoption adoption= Adoption(DeployedAddresses.Adoption());

    // 测试领养函数
    function testAdoptPet() public {

        uint returnId= adoption.adopt(8);

        uint expected = 8;

        Assert.equal(returnId,expected,"pet id should be 8");

    }
}
pragma solidity ^0.4.17;

contract OrganChain{
    
    struct Recipient{
        address hospital;
        string organ;
        string bloodgroup;
        bool matchfound;
        bool exist;
    }
    
    struct Donor{
        string organ;
        string bloodgroup;
        bool matchfound;
        bool exist;
    }
    
    struct Transplant{
        address recipient;
        address donor;
    }
    
    mapping(address => Recipient) Recipients;
    mapping(address => Donor) Donors;
    Transplant[] Transplants;
    
    address[] recipient_arr;
    address[] donor_arr;
    
    modifier checkrecipientexist(address recipient_addr){
        require(!Recipients[recipient_addr].exist);
        _;
    }
    
     modifier checkdonorexist(address donor_addr){
        require(!Donors[donor_addr].exist);
        _;
    }
    
    function addDonor(address donor_addr, string memory organ, string memory bloodgroup) public checkdonorexist(donor_addr) {
        Donor memory newDonor = Donor({
            organ : organ,
            bloodgroup : bloodgroup,
            matchfound : false,
            exist : true
        });
        Donors[donor_addr] = newDonor;
        donor_arr.push(donor_addr);
    }
    
    function getDonor(address donor_addr) public view returns(string memory, string memory, bool){
        require(Donors[donor_addr].exist);
        return (
            Donors[donor_addr].organ,
            Donors[donor_addr].bloodgroup,
            Donors[donor_addr].matchfound
        );
    }
    
    function addRecipient(address recipient_addr, address hospital,string memory organ, string memory bloodgroup) public checkrecipientexist(recipient_addr){
        Recipient memory newRecipient = Recipient({
            hospital : hospital,
            organ : organ,
            bloodgroup : bloodgroup,
            matchfound : false,
            exist : true
        });
        Recipients[recipient_addr] = newRecipient;
        recipient_arr.push(recipient_addr);
    }
    
    function getRecipient(address recipient_addr) public view returns(address, string memory, string memory, bool){
        require(Recipients[recipient_addr].exist); 
        return (
            Recipients[recipient_addr].hospital,
            Recipients[recipient_addr].organ,
            Recipients[recipient_addr].bloodgroup,
            Recipients[recipient_addr].matchfound
        );
    }
    
}
    pragma solidity 0.4.22;

contract OrganChain{
    
    struct Recipient{
        address recipientId;
        address hospitalId;
        string ipfsHash;
        string EMRHash;
        string organ;
        string bloodgroup;
        bool matchFound;
        bool exist;
    }
    
    struct Donor{
        address donorId;
        address recipientId;
        string ipfsHash;
        string EMRHash;
        string organ;
        string bloodgroup;
        bool matchFound;
        bool exist;
    }
    
    struct Transplant{
        address recipientId;
        address donorId;
        bool exist;
    }
    
    
    mapping(address => Recipient) Recipients;
    mapping(address => Donor) Donors;
    mapping(address => address[]) Hospital_Recipients;
    mapping(address => Transplant) Transplants;
    
    address[] recipient_arr;
    address[] donor_arr;
    
    modifier checkRecipientExist(address _addr){
        require(!Recipients[_addr].exist);
        _;
    }
    
     modifier checkDonorExist(address _addr){
        require(!Donors[_addr].exist);
        _;
    }
    
    function addDonor(
        address _donor_addr, 
        string memory _ipfsHash,
        string memory _EMRHash,
        string  _organ, 
        string  _bloodgroup) public checkDonorExist(_donor_addr) checkRecipientExist(_donor_addr)
        {
            Donor memory newDonor = Donor({
                donorId : _donor_addr,
                recipientId : address(0x0),
                ipfsHash : _ipfsHash,
                EMRHash : _EMRHash,
                organ : _organ,
                bloodgroup : _bloodgroup,
                matchFound : false,
                exist : true
            });
            Donors[_donor_addr] = newDonor;
            donor_arr.push(_donor_addr);
        }
    
    function getDonor(address _donor_addr) public view returns ( string memory, string, string, bool, address){
            require(Donors[_donor_addr].exist);
            return(
                Donors[_donor_addr].ipfsHash,
                Donors[_donor_addr].organ,
                Donors[_donor_addr].bloodgroup,
                Donors[_donor_addr].matchFound,
                Donors[_donor_addr].recipientId
            );
    }
    
    function addRecipient(
        address _recipient_addr,
        address _hospital_addr,
        string memory _ipfsHash,
        string memory _EMRHash,
        string _organ, 
        string _bloodgroup) public checkRecipientExist(_recipient_addr) checkDonorExist(_recipient_addr)
        {
            Recipient memory newRecipient = Recipient({
                recipientId : _recipient_addr,
                hospitalId : _hospital_addr,
                ipfsHash : _ipfsHash,
                EMRHash : _EMRHash,
                organ : _organ,
                bloodgroup : _bloodgroup,
                matchFound : false,
                exist : true
            });
            Recipients[_recipient_addr] = newRecipient;
            recipient_arr.push(_recipient_addr);
            Hospital_Recipients[_hospital_addr].push(_recipient_addr);
        }
    
    function getRecipient(address _recipient_addr) public view returns ( address, string memory, string, string, bool){
            require(Recipients[_recipient_addr].exist);
            return(
                Recipients[_recipient_addr].hospitalId,
                Recipients[_recipient_addr].ipfsHash,
                Recipients[_recipient_addr].organ,
                Recipients[_recipient_addr].bloodgroup,
                Recipients[_recipient_addr].matchFound
           );
    }
    
    function getRecipientCount(address _hospital_addr) public view returns(uint256)
    {
        return(Hospital_Recipients[_hospital_addr].length);
    }
    
    function getRecipientDetail(address _hospital_addr, uint256 i) public view returns(address, string memory, string, string){  
            if(!Recipients[Hospital_Recipients[_hospital_addr][i]].matchFound){
                return(
                    Recipients[Hospital_Recipients[_hospital_addr][i]].recipientId,
                    Recipients[Hospital_Recipients[_hospital_addr][i]].ipfsHash,
                    Recipients[Hospital_Recipients[_hospital_addr][i]].organ,
                    Recipients[Hospital_Recipients[_hospital_addr][i]].bloodgroup
                );
            }
    }
    
    function isMatchFound(address _recipient_addr) public view returns(bool){
        return Recipients[_recipient_addr].matchFound;
    }
    
    function getMatchedDonor(address _recipient_addr) public view returns(address){
        return(
            Transplants[_recipient_addr].donorId       
        );
    }
    
    function getEMR(address _address) public view returns (string memory) {
        for(uint i=0 ; i<donor_arr.length ; i++)
        {
            if(_address == donor_arr[i])
                return(Donors[donor_arr[i]].EMRHash);
        }
        for(uint j=0 ; j<recipient_arr.length ; j++)
        {
            if(_address ==  recipient_arr[j])
                return(Recipients[recipient_arr[j]].EMRHash);
        }
    }
    
    function transplantMatch(address _recipient_addr) public  {
        for(uint i=0 ; i<donor_arr.length ; i++)
        {
            if( !Donors[donor_arr[i]].matchFound 
            && (keccak256(abi.encodePacked(Recipients[_recipient_addr].organ)) == keccak256(abi.encodePacked(Donors[donor_arr[i]].organ))) 
            && (keccak256(abi.encodePacked(Recipients[_recipient_addr].bloodgroup)) == keccak256(abi.encodePacked(Donors[donor_arr[i]].bloodgroup))))
            {   
                Transplants[_recipient_addr] = Transplant(_recipient_addr,donor_arr[i],true);
                Donors[donor_arr[i]].recipientId = _recipient_addr;
                Recipients[_recipient_addr].matchFound = true;
                Donors[donor_arr[i]].matchFound = true;
            }
        }
    }
}
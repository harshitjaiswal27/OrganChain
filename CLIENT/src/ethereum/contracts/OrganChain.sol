pragma solidity 0.4.22;

contract OrganChain{
    
    struct Recipient{
        address recipientId;
        address donorId;
        address hospitalId;
        string ipfsHash;
        string EMRHash;
        bytes32 organ;
        bytes32 bloodgroup;
        bool exist;
    }
    
    struct Donor{
        address donorId;
        address recipientId;
        string ipfsHash;
        string EMRHash;
        bytes32 organ;
        bytes32 bloodgroup;
        bool exist;
    }
    
    
    mapping(address => Recipient) Recipients;
    mapping(address => Donor) Donors;
    mapping(address => address[]) Hospital_Recipients;
    
    address[] recipient_arr;
    address[] donor_arr;
    
    
    modifier checkRecipientExist(address _recipient_addr){
        require(!Recipients[_recipient_addr].exist);
        _;
    }
    
     modifier checkDonorExist(address _donor_addr){
        require(!Donors[_donor_addr].exist);
        _;
    }
    
    function addDonor(
        address _donor_addr, 
        string memory _ipfsHash,
        string memory _EMRHash,
        bytes32  _organ, 
        bytes32  _bloodgroup) public checkDonorExist(_donor_addr) 
        {
            Donor memory newDonor = Donor({
                donorId : _donor_addr,
                recipientId : address(0x0),
                ipfsHash : _ipfsHash,
                EMRHash : _EMRHash,
                organ : _organ,
                bloodgroup : _bloodgroup,
                exist : true
            });
            Donors[_donor_addr] = newDonor;
            donor_arr.push(_donor_addr);
        }
    
    function getdonor(address _donor_addr) public view returns (address, address, string memory, bytes32, bytes32){
            require(Donors[_donor_addr].exist);
            return(
                Donors[_donor_addr].donorId,
                Donors[_donor_addr].recipientId,
                Donors[_donor_addr].ipfsHash,
                Donors[_donor_addr].organ,
                Donors[_donor_addr].bloodgroup
            );
    }
    
    function addDonor(
        address _recipient_addr,
        address _hospital_addr,
        string memory _ipfsHash,
        string memory _EMRHash,
        bytes32 _organ, 
        bytes32 _bloodgroup) public checkRecipientExist(_recipient_addr) 
        {
            Recipient memory newRecipient = Recipient({
                recipientId : _recipient_addr,
                hospitalId : _hospital_addr,
                donorId : address(0x0),
                ipfsHash : _ipfsHash,
                EMRHash : _EMRHash,
                organ : _organ,
                bloodgroup : _bloodgroup,
                exist : true
            });
            Recipients[_recipient_addr] = newRecipient;
            recipient_arr.push(_recipient_addr);
            Hospital_Recipients[_hospital_addr].push(_recipient_addr);
        }
    
    function getRecipient(address _recipient_addr) public view returns (address, address, address, string memory, bytes32, bytes32){
            require(Recipients[_recipient_addr].exist);
            return(
                Recipients[_recipient_addr].recipientId,
                Recipients[_recipient_addr].donorId,
                Recipients[_recipient_addr].hospitalId,
                Recipients[_recipient_addr].ipfsHash,
                Recipients[_recipient_addr].organ,
                Recipients[_recipient_addr].bloodgroup
           );
    }
    
    function getRecipientCount(address _hospital_addr) public view returns(uint256)
    {
        return(Hospital_Recipients[_hospital_addr].length);
    }
    
    function getRecipientDetail(address _hospital_addr, uint256 i) public view returns(address, string memory, bytes32, bytes32){  
            if(Recipients[Hospital_Recipients[_hospital_addr][i]].donorId == address(0x0)){
                return(
                    Recipients[Hospital_Recipients[_hospital_addr][i]].recipientId,
                    Recipients[Hospital_Recipients[_hospital_addr][i]].ipfsHash,
                    Recipients[Hospital_Recipients[_hospital_addr][i]].organ,
                    Recipients[Hospital_Recipients[_hospital_addr][i]].bloodgroup
                );
            }
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
    
    function transplantMatch(address _recipient_addr) public returns(address) {
        for(uint i=0 ; i<donor_arr.length ; i++)
        {
            if( (Recipients[_recipient_addr].organ == Donors[donor_arr[i]].organ) 
            && (Recipients[_recipient_addr].bloodgroup == Donors[donor_arr[i]].bloodgroup))
            {   
                Recipients[_recipient_addr].donorId = donor_arr[i];
                Donors[donor_arr[i]].recipientId = _recipient_addr;
                return (donor_arr[i]);
            }
        }
    }
}
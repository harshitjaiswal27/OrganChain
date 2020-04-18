import React, {Component} from "react";
import { Route, Switch } from "react-router-dom";

import DonorLogin from './pages/donor-login';
import DonorSignUp from './pages/donor-signup';
import HospitalList from './pages/hospital-list';
import HospitalLogin from './pages/hospital-login';
import Home from './pages/home';
import ApproveDonor from './pages/hospital/approve-donor';
import PatientRecord from './pages/hospital/patient-record';
import RegisterRecipient from './pages/hospital/register-recipient';
import TransplantMatch  from './pages/hospital/transplant-match';

class Routes extends Component{
    render(){
        return(
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/donor-signup" component={DonorSignUp} />
                <Route exact path="/donor-login" component={DonorLogin} />
                <Route exact path="/hospital-list/:city" component={HospitalList} />
                <Route exact path="/hospital-login" component={HospitalLogin} />
                <Route exact path="/hospital/approve-donor" component={ApproveDonor} />
                <Route exact path="/hospital/patient-record" component={PatientRecord} />
                <Route exact path="/hospital/register-recipient" component={RegisterRecipient} />
                <Route exact path="/hospital/transplant-match" render={()=><TransplantMatch/>} />
            </Switch>
        )
    }
}

export default Routes;
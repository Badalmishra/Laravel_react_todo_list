import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Example extends Component {
    constructor(props) {
        super(props);
        this.state={
            jobs:[ ],
            input:"",
        };
        window.jobs=this.state.jobs;
    }
    componentDidMount() {
        axios.get(`api/jobs`)
          .then(res => {
            const jobs = res.data;
            this.setState({ jobs:jobs });
          })
      }
    delete(){
        var index =event.target.id;
        //alert(index);
        axios.delete('api/jobs/'+index)
          .then(res => {
            const jobs = res.data;
            this.setState({ jobs:jobs });
          });
    }
    changeInput(){
       // alert(event.key);
        this.setState({
            input:event.target.value,
        });
    }
    Keypress(){
        if (event.key === 'Enter') {
            var newJobs=this.state.jobs.slice();

            var body =this.state.input;
            var user_id=1;
            axios.post('api/jobs', { body })
                .then(res => {
                    window.res=res;
                    this.setState({
                        jobs:res.data,
                        input:"",
                 });
            })
           
        }

    }
    addJob(){
        var body =this.state.input;
        var user_id=1;
        axios.post('api/jobs', { body })
            .then(res => {
                window.res=res;
                this.setState({
                    jobs:res.data,
                    input:"",
                });
        })
        
        
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Todo Component</div>
                            <div id="form" className="input-group input-group-lg">
                               
                                <input id="input" type="text" onKeyPress={this.Keypress.bind(this)}  onChange={this.changeInput.bind(this)} value={this.state.input}  className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
                                <div className="input-group-append">
                                   <button className=" btn btn-primary input-group-btn" onClick={this.addJob.bind(this)}>Add</button>
                                </div>
                            </div>

                            <div className="card-body">
                            
                            <ul class="list-group">
                            <li class="list-group-item active">All Jobs</li>
                                {this.state.jobs.length==0?
                                 <li class="list-group-item "> Empty List...</li>://if jobs array is empty 
                                 this.state.jobs.map((job,key) =>  // if there are some jobs
                                 <ul id={key} class=" list-group list-group-horizontal  w-100">       
                                    <li class="list-group-item col-md-10" >{job.body}</li>
                                    <button id={job.id} className="list-group-item delete col-md-2 btn btn-outline-danger" onClick={this.delete.bind(this)}><b>Delete</b></button>
                                 </ul>
                                  )
                            }
                               
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}

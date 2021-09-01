import axios from "axios";
import React, { Component } from "react";
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { differenceBy } from "lodash";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            candidates: [],
            selectedRows: [],
            name: '',
            experience: 0,
            profile: '',
            toggleCleared: false,
            showModal: false,
            isLoading: true
        }

        this.handleDelete = this.handleDelete.bind(this);
        this.handleRowSelected = this.handleRowSelected.bind(this);
        this.showDialog = this.showDialog.bind(this)
        this.hideDialog = this.hideDialog.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.signOut = this.signOut.bind(this)
    }

    componentDidMount() {
        this.getData()
    }

    componentDidUpdate() {
        if(!this.isLoading){
            this.getData()
        }
    }

    showDialog(){
        this.setState({
            showModal: true
        });
    }

    hideDialog(){
        this.setState({
            showModal: false
        });
    }

    handleAdd() {
        axios.post('http://localhost:8000/api/candidates/',{
            name: this.state.name,
            experience: this.state.experience,
            profile: this.state.profile
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        });

        this.setState({
            name: '',
            experience: 0,
            profile: '',
            showModal: false
        });
    }

    handleDelete() {
        if(window.confirm(`Are you sure you want to delete:\r ${this.state.selectedRows.map(r=> r.name)} ?`)) {
            this.setState({
                toggleCleared: !this.state.toggleCleared,
                candidates: differenceBy(this.state.candidates, this.state.selectedRows, 'name')
            });
            this.state.selectedRows.forEach(element => {
                axios.delete(`http://localhost:8000/api/candidates/${element.id}/`)
                .then(response=>{
                    console.log('deleted successfully')
                })
                .catch(error => {
                    console.log(error)
                });
            });
        }
    }

    contextActions() {
        return(
        <Button key="delete" onClick={this.handleDelete} variant="danger">
            Delete
            </Button>
        )
    }

    actions() {
        return(
            <Button key="add" variant="primary" onClick={this.showDialog}>Add</Button>
        );
    }

    handleRowSelected = (state) => {
        this.setState({
            selectedRows: state.selectedRows
        });
    }

    getData() {
        axios.get('http://localhost:8000/api/candidates/')
        .then(response => {
            this.setState({candidates: response.data,isLoading: false})
        })
        .catch(error => {
            console.log(error)
        })
    }

    signOut() {
        this.props.history.push('/');
    }

    columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Experience',
            selector: row => row.experience,
            sortable: true,
        },
        {
            name: 'Profile',
            selector: row => row.profile,
            sortable: true,
        }
    ]

    render(){
        return(
            <>
            <DataTable
                title='Dashboard'
                columns={this.columns}
                data={this.state.candidates}
                selectableRows
                actions={this.actions()}
                contextActions={this.contextActions()}
                onSelectedRowsChange={this.handleRowSelected}
                clearSelectedRows={this.state.toggleCleared}
            />
            <br/>
            <Button variant="danger" onClick={this.signOut}>
                Sign Out
            </Button>
            <Modal show={this.state.showModal} onHide={this.hideDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Candidate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control type="text" placeholder="Name" value={this.state.name} onChange={e=>this.setState({name: e.target.value})} />
                    <br/>
                    <Form.Control type="number" placeholder="Experience" value={this.state.experience} onChange={e=>this.setState({experience: e.target.value})} />
                    <br/>
                    <Form.Control type="text" placeholder="Profile" value={this.state.profile} onChange={e=>this.setState({profile: e.target.value})} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.hideDialog}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleAdd}>
                        Add Candidate
                    </Button>
                </Modal.Footer>
            </Modal>
            </>
        )
    }
}

export default withRouter(Dashboard);
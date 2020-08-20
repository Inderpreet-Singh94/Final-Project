import React from 'react';
class AllTracks extends React.Component {
    constructor(props){
        super(props);
        this.state={
            list:[],
            txt:''
        };
    }
    componentDidMount(){     
        var component=this;
        const api="http://localhost:3001/tracks";        
        fetch(api)
        .then((res)=>res.json())
        .then(data => 
            {              
                component.setState({
                    list:data
                });
                console.log(data);                
            }            
        );          
    }

    deleteTrack(id){
        const requestOptions = {
            method: 'DELETE'            
        };
        fetch('http://localhost:3001/tracks/'+id, requestOptions)
            .then(response => response.json())
            .then(data => {
                alert("deleted from database");
                window.location.href="/tracks";
            });
    }
    render(){
        const tracks=this.state.list;
        return (<div className="container">
            <h2>All Track List</h2>
        <table className="table table-bordered table-sm table-striped table-hover text-left">
            <thead className="table-primary">
                <tr>
                    <th>Track ID</th>
                    <th>Title</th>
                    <th>Track URI</th>
                    <th>Operation</th>
                </tr>
            </thead>
            <tbody>
        { tracks.map((track) => (
            <tr>                        
                    <td>{track.id}</td>
                    <td>{track.title}</td>
                    <td><a href={track.uri}>{track.uri}</a></td>
                    <td><button onClick={()=>this.deleteTrack(track.id)} className="btn btn-outline-danger btn-sm">Delete</button></td>
            </tr>
        ))}        
        </tbody>
        </table>
        </div>);
    }

}

export default AllTracks;

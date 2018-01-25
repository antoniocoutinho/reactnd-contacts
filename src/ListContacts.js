import React, { Component } from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component {
    static propTypes ={
        con: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired,
    }
    state = {
        query: ''
    }
    updateQuery = (query) => {
        this.setState({query: query.trim()})
    }
    clearQuery = () => {
        this.setState({query: ''})
    }
    render () {
        const {con, onDeleteContact } = this.props;
        const {query} = this.state;
        let showingContacts;
        if (query){
            const match = new RegExp(escapeRegExp(query),'i');
            showingContacts = con.filter((contact) => match.test(contact.name))
        }else{
            showingContacts = con;
        }
        showingContacts.sort(sortBy('name'));
        
        return(
            <div className='list-contacts'>
            
            
                <div className='list-contacts-top'>
                
                    <input 
                        className='search-contacts'
                        type='text'
                        placeholder='Procura contato'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <Link 
                        to='/create'
                        className='add-contact'
                    > Add Contact                      
                    </Link>

                </div>
                {/* This part of code will only be browsing if the length of showingContacts array will diferent os con array.  */}
                
                {showingContacts.length !== con.length && (
                    <div className='showing-contacts'>
                        <span>Now showing {showingContacts.length} of {con.length} <button onClick={this.clearQuery}>Show all</button> </span>
                    </div>
                )}

                <ol className='contact-list'>
                {showingContacts.map((contact)=> (
                    <li key={contact.id} className='contact-list-item'>
                        <div className='contact-avatar' style={{
                            backgroundImage: `url(${contact.avatarURL})`
                        }}/>
                        <div>
                            <p>{contact.name}</p>
                            <p>{contact.email}</p>
                        </div>
                        <button 
                            className='contact-remove' 
                            onClick={() =>  onDeleteContact(contact)}>
                            Remove
                        </button>
                    </li>   
                    ))  }
                </ol>
    
            </div>
                    )
    }
}




export default ListContacts;
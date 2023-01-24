import { React, Component } from 'react';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Kim Namjoon', number: '459-12-56' },
      { id: 'id-2', name: 'Park Jimin', number: '443-89-12' },
      { id: 'id-3', name: 'Min Yoongi', number: '645-17-79' },
      { id: 'id-4', name: 'Jeon Jungkook', number: '227-91-26' },
    ],
    filter: '',
  };

   componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addName = object => {
    const { contacts } = this.state;
    if (contacts.find(contact => contact.name === object.name)) {
      return alert(`${object.name} is already in contact`);
    }

    this.setState(prevState => ({
      contacts: [object, ...prevState.contacts],
    }));
    console.log(contacts);
  };

  handleAddContact = newContact =>
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));

  handleCheckUnique = name => {
    const { contacts } = this.state;
    const isExistContact = !!contacts.find(contact => contact.name === name);

    isExistContact && alert(`${name} is already in contacts`);

    return !isExistContact;
  };

  handleremoveContact = id =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));

  handleFilterChange = filter => this.setState({ filter });

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <>
        <ContactForm
          onAdd={this.handleAddContact}
          onCheckUnique={this.handleCheckUnique}
        />

        {/* <Filter filter={filter} onChange={this.handleFilterChange} /> */}
        <ContactList
          contacts={visibleContacts}
          onRemove={this.handleremoveContact}
        >
          <Filter filter={filter} onChange={this.handleFilterChange} />
        </ContactList>
      </>
    );
  }
}

export default App;
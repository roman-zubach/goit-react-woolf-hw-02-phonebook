import { Component } from 'react';
import { ContactForm, ContactList, Filter, Section } from './components';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = contact => {
    this.setState((current) => ({
      contacts: [{ id: nanoid(), ...contact }, ...current.contacts],
    }));
  };

  removeContact = removeId => {
    this.setState((current) => ({
      contacts: current.contacts.filter(({ id }) => id !== removeId),
    }));
  };

  isNameExist = newName => {
    return this.state.contacts.some(({ name }) => name === newName);
  };

  updateFilter = ({ target: { value } }) => {
    this.setState({ filter: value });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = filter
      ? contacts.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))
      : contacts;

    return (
      <div>
        <Section>
          <h1>Phonebook</h1>
          <ContactForm
            save={this.addContact}
            isNameExist={this.isNameExist}
          />
        </Section>

        <Section>
          <h2>Contacts</h2>
          <Filter onChange={this.updateFilter} />
          <ContactList contacts={filteredContacts} handleRemove={this.removeContact} />
        </Section>
      </div>
    );
  }
}

export default App;

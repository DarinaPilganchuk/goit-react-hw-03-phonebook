import React from 'react'
import styles from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onRemove, children }) => {
  return (
    <div className={styles.contacts}>
      <h2>Contacts</h2>
      {children}
      <ul>
        {contacts.length === 0 ? null : (
          <>
            {contacts.map(contact => {
              return (
                <li key={contact.id}>
                  <p>
                    <span>{contact.name} : </span>
                    {contact.number}
                  </p>
                  <button
                    onClick={() => {
                      onRemove(contact.id);
                    }}
                  >
                    ⛌
                  </button>
                </li>
              );
            })}
          </>
        )}
      </ul>
    </div>
  );
};
ContactList.propTypes = {
  contacts: PropTypes.array,
  children: PropTypes.object,
  onRemove: PropTypes.func,
};

export default ContactList;
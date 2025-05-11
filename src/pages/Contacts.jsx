import React from 'react';
import PageHeader from '../Components/PageHeader';
import HeadDetails from '../Components/HeadDetails';
import ContactInfo from './contact/ContactInfo';
import ContactForm from './contact/ContactForm';

const Contacts = () => {
    return (
        <div>
            <div className='w-10/12 mx-auto mt-5 mb-5'>
                <div className="flex flex-col gap-6 md:gap-10 lg:gap-12">
                    {/* <PageHeader page={"Contacts"} /> */}
                    <div className="flex flex-col gap-10">
                        <HeadDetails
                            title={"Get in"}
                            colortitle={"Touch"}
                            subtitle={
                                "Please select a topic below related to you inquiry. If you don t fint what you need, fill out our contact form."
                            }
                        />
                        <ContactInfo />
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacts;
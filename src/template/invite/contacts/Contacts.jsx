/** @format */

import React from 'react';
import InviteAccordian from '../../../components/invite/InviteAccordian';
import InviteTextProvider from '../../../components/invite/InviteTextProvider';
import { WhatsappIcon, PhoneIcon } from '../../../components/icons/inviteIcons';
import moment from 'moment';
import './Contacts.scss';

const ContactContainer = ({ contact_info }) => {
	return (
		<div className='flex flex-col px-1'>
			{contact_info?.map((contact, index) => {
				return (
					<div
						key={contact.name}
						className='flex py-4 border-b last:border-0 flex-row justify-between items-center'>
						<div className='flex flex-col gap-3'>
							<InviteTextProvider color='#1D4648'>{contact.name}</InviteTextProvider>
							<InviteTextProvider color='#98A2B3'>{contact.phone}</InviteTextProvider>
						</div>
						<div className='flex gap-3'>
							<a
								href={`https://wa.me/6${contact?.phone}`}
								target='_blank'
								rel='noreferrer'
								className='contact'>
								<WhatsappIcon width='26px' height='26px' />
							</a>
							<a href={`tel:+${contact?.phone}`} rel='noreferrer'>
								<PhoneIcon width='26px' height='26px' fillColor='#1E1E1E' />
							</a>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export function ContactAccordian({ contact_info = [], enable_bahasa }) {
	return (
		<div className='w-full'>
			<InviteAccordian title={enable_bahasa ? 'Hubungi' : 'Contact'}>
				<ContactContainer contact_info={contact_info} />
			</InviteAccordian>
		</div>
	);
}

/** @format */

//Context import
import { useUserContext } from '../context/UserContext';

//PDF import
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import moment from 'moment';

export const usePDF = () => {
	const { userInfo } = useUserContext();

	const convertRSVP = (rsvp) => {
		if (rsvp === 'attending') return 'Attending';
		if (rsvp === 'notattending') return 'Not Attending';
		if (rsvp === 'maybe') return 'Maybe';
		if (rsvp === 'invite') return 'Invited';

		return '';
	};

	const organizeAlphabetically = (a, b) => {
		const nameA = a.name.toLowerCase();
		const nameB = b.name.toLowerCase();
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		return 0;
	};

	const handleSavePDF = (guestlist) => {
		let guestlistPDF = [];
		const doc = new jsPDF();

		console.log('userInfo', userInfo);

		guestlist?.sort(organizeAlphabetically).forEach((guest, index) => {
			guestlistPDF.push([
				index,
				guest.name,
				convertRSVP(guest.rsvp),
				guest.pax,
				guest.group ? guest.group : '',
				guest.phone ? guest.phone : '',
			]);
		});

		const headStyles = {
			fillColor: [30, 30, 30],
			textColor: [255, 255, 255],
			fontStyle: 'bold',
			cellPadding: 3,
			halign: 'center',
		};

		const docName = `Guestlist_${userInfo?.displayName.split(' ')[0]}_${moment().format(
			'DD-MM-YYYY'
		)}.pdf`;

		doc.text(`${userInfo?.displayName}'s Event Guestlist`, 12, 10);
		doc.setFontSize(12);
		doc.text(`Update for ${moment().format('h:mmA DD/MM/YYYY ')}`, 12, 16);

		doc.autoTable({
			head: [['ID', 'NAME', 'RSVP', 'PAX', 'GROUP', 'PHONE']],
			body: guestlistPDF,
			headStyles: headStyles,
			styles: { fillColor: [255, 0, 0], border: 10 },
			bodyStyles: {
				fillColor: [250, 255, 250],
				textColor: [30, 30, 30],
				cellPadding: 1.9,
				lineColor: 210,
				border: 1,
			},
			columnStyles: {
				0: { halign: 'center', fontStyle: 'bold' },
				2: { halign: 'center', fontStyle: 'bold', font: 'courier', minCellWidth: 34 },
				3: { halign: 'center' },
			},
			margin: { top: 20 },
		});
		doc.setFontSize(10);
		doc.text(`Visit majlisku.com to create FREE Digital Invite for your special event!`, 12, 285);

		doc.save(docName);
	};

	return { handleSavePDF };
};

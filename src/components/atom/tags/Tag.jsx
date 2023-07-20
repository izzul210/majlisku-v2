/** @format */
import './Tag.scss';
import { AttendingIcon, NotAttendingIcon, MaybeIcon, InvitedIcon } from '../../icons/brandIcons';

export const GuestRSVPTag = ({ type, width, height }) => {
	const _width = width ? width : '20px';
	const _height = height ? height : '20px';

	return (
		<div>
			{(() => {
				switch (type) {
					case 'invited':
						return (
							<div className='guest-invitedRSVP'>
								<InvitedIcon width={_width} height={_height} />
								<div>Invited</div>
							</div>
						);
					case 'attending':
						return (
							<div className='guest-attendingRSVP'>
								<AttendingIcon width={_width} height={_height} />
								<div>Attending</div>
							</div>
						);
					case 'notattending':
						return (
							<div className='guest-notattendingRSVP'>
								<NotAttendingIcon width={_width} height={_height} />
								<div className='whitespace-nowrap'>Not Attending</div>
							</div>
						);
					case 'maybe':
						return (
							<div className='guest-maybeRSVP'>
								<MaybeIcon width={_width} height={_height} fillColor='black' />
								<div>Maybe</div>
							</div>
						);
					default:
						<>default</>;
				}
			})()}
		</div>
	);
};

export const GuestRSVPMobileTag = ({ type, width, height }) => {
	const _width = width ? width : '20px';
	const _height = height ? height : '20px';

	return (
		<div>
			{(() => {
				switch (type) {
					case 'invited':
						return (
							<div className='guest-invitedRSVP'>
								<InvitedIcon width={_width} height={_height} />
							</div>
						);
					case 'attending':
						return (
							<div className='guest-attendingRSVP'>
								<AttendingIcon width={_width} height={_height} />
							</div>
						);
					case 'notattending':
						return (
							<div className='guest-notattendingRSVP'>
								<NotAttendingIcon width={_width} height={_height} />
							</div>
						);
					case 'maybe':
						return (
							<div className='guest-maybeRSVP'>
								<MaybeIcon width={_width} height={_height} fillColor='black' />
							</div>
						);
					default:
						<></>;
				}
			})()}
		</div>
	);
};

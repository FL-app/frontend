import { Routes as RoutesDOM, Route } from 'react-router-dom';

import {
	Registration,
	TermsOfUse,
	PrivacyPolicy,
	Signin,
	Welcome,
	Friends,
	AccessGeo,
	AccessGeoError,
} from '../pages';

import { ROUTES } from '../constants';

export const Routes = () => (
	<RoutesDOM>
		<Route path={ROUTES.ROOT} element={<Welcome />} />
		<Route path={ROUTES.REGISTRATION} element={<Registration />} />
		<Route path={ROUTES.SIGN_IN} element={<Signin />} />
		<Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />
		<Route path={ROUTES.TERMS_OF_USE} element={<TermsOfUse />} />
		<Route path={ROUTES.FRIENDS} element={<Friends />} />
		<Route path={ROUTES.ACCESS_GEO} element={<AccessGeo />} />
		<Route path={ROUTES.ACCESS_GEO_ERROR} element={<AccessGeoError />} />
	</RoutesDOM>
);
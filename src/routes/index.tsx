import { Routes as RoutesDOM, Route } from 'react-router-dom';

import {
	Registration,
	TermsOfUse,
	PrivacyPolicy,
	Login,
	Welcome,
	Friends,
	AccessGeo,
	AccessGeoError,
	Profile,
	AccessAge,
	ComingSoon,
} from '../pages';

import RoutesPath from '../constants/enums/routesPath';
import { TrackingMap } from '../pages/TrackingMap/TrackingMap';
import { PrivateRoute, PublicRoute } from '../components';

export const Routes = () => (
	<RoutesDOM>
		<Route
			path={RoutesPath.root}
			element={
				<PublicRoute>
					<Welcome />
				</PublicRoute>
			}
		/>
		<Route
			path={RoutesPath.registration}
			element={
				<PublicRoute>
					<Registration />
				</PublicRoute>
			}
		/>
		<Route
			path={RoutesPath.login}
			element={
				<PublicRoute>
					<Login />
				</PublicRoute>
			}
		/>
		<Route path={RoutesPath.privacyPolicy} element={<PrivacyPolicy />} />
		<Route path={RoutesPath.termsOfUse} element={<TermsOfUse />} />
		<Route
			path={RoutesPath.friends}
			element={
				<PrivateRoute>
					<Friends />
				</PrivateRoute>
			}
		/>
		<Route
			path={RoutesPath.accessGeo}
			element={
				<PrivateRoute>
					<AccessGeo />
				</PrivateRoute>
			}
		/>
		<Route
			path={RoutesPath.accessGeoError}
			element={
				<PrivateRoute>
					<AccessGeoError />
				</PrivateRoute>
			}
		/>
		<Route
			path={RoutesPath.map}
			element={
				<PrivateRoute>
					<TrackingMap />
				</PrivateRoute>
			}
		/>
		<Route
			path={RoutesPath.profile}
			element={
				<PrivateRoute>
					<Profile />
				</PrivateRoute>
			}
		/>
		<Route
			path={RoutesPath.accessAge}
			element={
				<PublicRoute>
					<AccessAge />
				</PublicRoute>
			}
		/>
		<Route path={RoutesPath.comingSoon} element={<ComingSoon />} />
		<Route path="*" element={<ComingSoon />} />
	</RoutesDOM>
);

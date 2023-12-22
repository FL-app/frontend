import { useState, useCallback, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import {
  Header,
  Footer,
  GeneralMenuPopup,
  SettingsMenuPopup,
} from '../components';
import MenuPopup from '../components/MenuPopup/MenuPopup';
import PopupDeleteAccount from '../components/PopupDeleteAccount/PopupDeleteAccount';
import { RootState } from '../store';

interface MainLayoutProps {
  handleSearch?: () => void;
  headerClassName: string;
  footerClassName?: string;
  children: ReactElement | ReactElement[];
}

export default function MainLayout(props: MainLayoutProps) {
  const { handleSearch, headerClassName, footerClassName, children } = props;
  const [isGeneralMenuPopupOpen, setIsGeneralMenuPopupOpen] = useState(false);
  const [isSettingsMenuPopupOpen, setIsSettingsMenuPopupOpen] = useState(false);
  const [isPopupDeleteAccountOpen, setIsPopupDeleteAccountOpen] =
    useState<boolean>(false);
  const [isActiveInvisible, setIsActiveInvisible] = useState(false);
  const [isActiveNightTheme, setIsActiveNightTheme] = useState(false);
  const userStatus = useSelector((state: RootState) => state.user.status);

  const handleOpenGeneralMenuPopup = useCallback(() => {
    setIsGeneralMenuPopupOpen(true);
  }, []);

  const handleOpenSettingsMenuPopup = useCallback(() => {
    setIsSettingsMenuPopupOpen(true);
  }, []);

  const handleOpenPopupDeleteAccount = useCallback(() => {
    setIsPopupDeleteAccountOpen(true);
  }, []);

  const closeAllPopups = useCallback(() => {
    setIsGeneralMenuPopupOpen(false);
    setIsSettingsMenuPopupOpen(false);
  }, []);

  const closeSettingsMenuPopup = useCallback(() => {
    setIsSettingsMenuPopupOpen(false);
  }, []);

  const closePopupDeleteAccount = useCallback(() => {
    setIsPopupDeleteAccountOpen(false);
  }, []);

  const toggleInvisibleOption = useCallback(() => {
    setIsActiveInvisible(!isActiveInvisible);
  }, [isActiveInvisible]);

  const toggleNightThemeOption = useCallback(() => {
    setIsActiveNightTheme(!isActiveNightTheme);
  }, [isActiveNightTheme]);

  return (
    <>
      <Header
        handleSearch={handleSearch}
        className={headerClassName}
        openGeneralMenuPopup={handleOpenGeneralMenuPopup}
      />
      {children}
      <Footer className={footerClassName} />

      {!isSettingsMenuPopupOpen && (
        <MenuPopup isOpen={isGeneralMenuPopupOpen} onClose={closeAllPopups}>
          <GeneralMenuPopup
            onClose={closeAllPopups}
            userStatus={userStatus}
            chooseInvisible={toggleInvisibleOption}
            isActiveInvisible={isActiveInvisible}
            openSettingsMenuPopup={handleOpenSettingsMenuPopup}
          />
        </MenuPopup>
      )}
      <MenuPopup isOpen={isSettingsMenuPopupOpen} onClose={closeAllPopups}>
        <SettingsMenuPopup
          onClose={closeSettingsMenuPopup}
          chooseNightTheme={toggleNightThemeOption}
          isActiveNightTheme={isActiveNightTheme}
          deleteAccount={handleOpenPopupDeleteAccount}
        />
      </MenuPopup>

      <PopupDeleteAccount
        isOpen={isPopupDeleteAccountOpen}
        onClose={closePopupDeleteAccount}
      />
    </>
  );
}

MainLayout.defaultProps = {
  handleSearch: undefined,
  footerClassName: '',
};

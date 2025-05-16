import { MyCarousel } from "../components/Carousel";
// import { useTranslation } from 'react-i18next';

function HomePage() {
  // const { t, i18n } = useTranslation();
  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  // }

  return (
      <div>
      {/* <h1 className="text-2xl">{t('welcome')}</h1>
      <div className="mt-4">
        <button className="btn mr-2" onClick={() => changeLanguage('en')}>English</button>
        <button className="btn" onClick={() => changeLanguage('vi')}>Tiếng Việt</button>
      </div> */}
        <MyCarousel />
      </div>
  );
}

export default HomePage;

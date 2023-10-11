import { TopSellers } from '~/components/containerCards/containerCards';
import { createIconsTypes } from '~/utils/createIcons';
import { ContainerPage } from './container_page';
import Categories from '~/components/containerCards/containerCardsCategory';
import PaymentMethodsList from '~/components/paymentMethod/paymentMethodsList';
import ReviewsContainer from '~/components/containerCards/containerCardsReviews';
import reviews from '~/mockData/mockReviwes';
import Banner from '~/components/Banner';
import BrandCarrousel from '~/components/carousels/brandCarrousel';
import SecondCarousel from '~/components/carousels/secondCarousel';

export default function Home() {
  createIconsTypes();
  return (
    <ContainerPage header={<SecondCarousel />}>
      <Categories />
      <TopSellers />
      <BrandCarrousel />
      <Banner />
      <ReviewsContainer reviwes={reviews} />
      <PaymentMethodsList />
    </ContainerPage>
  );
}

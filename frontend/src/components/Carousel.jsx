import { Carousel } from "flowbite-react";

export function MyCarousel() {
  return (
    <div className="h-152">
      <Carousel slideInterval={2000}>
        <img src="https://cellphones.com.vn/sforum/wp-content/uploads/2022/05/ganyu-genshin-impact-tro-choi-dien-tu-anime-hinh-nen-2560x1600_7-e1651946864949.jpg" alt="..." />
        <img src="https://www.psu.com/wp/wp-content/uploads/2020/10/Genshin-Impact-PS4-Wallpapers-04.jpg" alt="..." />
        <img src="https://www.psu.com/wp/wp-content/uploads/2020/10/genshin_impact-ps4-ps5-wallpapers-nov-05.jpg" alt="..." />
        <img src="https://www.psu.com/wp/wp-content/uploads/2020/10/genshin_impact-ps4-ps5-wallpapers-nov-07.jpg" alt="..." />
      </Carousel>
    </div>
  );
}
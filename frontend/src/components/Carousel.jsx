import { Carousel } from "flowbite-react";

export function MyCarousel() {
  return (
    <div className="h-152">
      <Carousel slideInterval={2000}>
        <img src="https://www.psu.com/wp/wp-content/uploads/2020/10/genshin_impact-ps4-ps5-wallpapers-nov-05.jpg" alt="..." />
        <img src="https://www.psu.com/wp/wp-content/uploads/2020/10/genshin_impact-ps4-ps5-wallpapers-nov-07.jpg" alt="..." />
      </Carousel>
    </div>
  );
}
import { Carousel } from "flowbite-react";

export function MyCarousel() {
  return (
    <div className="h-152">
      <Carousel slideInterval={1500}>
        <img src="https://www.gradelink.com/wp-content/uploads/2016/06/SISShopping-1080x675.jpg" alt="..." />
        <img src="https://f.hubspotusercontent40.net/hubfs/1627749/student%20relationship%20management.jpg" alt="..." />
        <img src="https://www.csss.es/wp-content/uploads/2019/11/management-students-43.webp" alt="..." />
      </Carousel>
    </div>
  );
}
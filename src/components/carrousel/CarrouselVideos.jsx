import { Carrousel } from './Carrousel';
import { carrouselMockData } from '../../data/carrouselMockData';

const images = carrouselMockData.map((item) => item.urlThumbnail);

export const CarrouselVideos = () => {
    return (
        <div>
            <h2 className="text-center">Trending Videos</h2>
            <Carrousel images={ images } />
        </div>
    );
};
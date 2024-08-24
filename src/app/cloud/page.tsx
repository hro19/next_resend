import CloudFrontImage from '@/components/SignedImage';

export default function Home() {
  return (
    <div>
      <h1>My Next.js App with CloudFront Images</h1>
      <div className="w-64 h-auto">
        <CloudFrontImage
            imageKey="git.png"
        />
        <CloudFrontImage
            imageKey="pngtree-dunk-master-picture-png-image_7389035.png"
        />
      </div>
    </div>
  );
}
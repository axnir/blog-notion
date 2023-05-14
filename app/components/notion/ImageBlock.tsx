import Image from 'next/image';
import type { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { getImageSize } from '@/app/common/utils';

export default async function ParagraphBlock(
  props: ImageBlockObjectResponse['image']
) {
  const imgUrl = props.type === 'file' ? props.file.url : props.external.url;
  const imgSize = await getImageSize(imgUrl);

  return (
    <Image
      className="my-4 rounded-md"
      src={imgUrl}
      height={imgSize.height}
      width={imgSize.width}
      loading="lazy"
      alt={props.caption?.[0]?.plain_text ?? 'post image'}
    />
  );
}

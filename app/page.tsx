'use client';

import {
  SiApple,
  SiBluesky,
  SiDiscord,
  SiFacebook,
  SiGithub,
  SiGoogle,
  SiInstagram,
  SiReddit,
  SiTelegram,
  SiYoutube,
} from '@icons-pack/react-simple-icons';
import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from '@/components/ui/shadcn-io/announcement';
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from '@/components/ui/shadcn-io/marquee';
import { Button } from '@/components/ui/button';
import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
} from '@/components/ui/shadcn-io/video-player';
import Link from 'next/link';
import { IconBrandTwitterFilled } from '@tabler/icons-react';

const logos = [
  {
    name: 'GitHub',
    icon: SiGithub,
    url: 'https://github.com',
  },
  {
    name: 'Facebook',
    icon: SiFacebook,
    url: 'https://facebook.com',
  },
  {
    name: 'Google',
    icon: SiGoogle,
    url: 'https://google.com',
  },
  {
    name: 'Twitter',
    icon: IconBrandTwitterFilled,
    url: 'https://twitter.com',
  },
  {
    name: 'Apple',
    icon: SiApple,
    url: 'https://apple.com',
  },
  {
    name: 'Instagram',
    icon: SiInstagram,
    url: 'https://instagram.com',
  },
  {
    name: 'YouTube',
    icon: SiYoutube,
    url: 'https://youtube.com',
  },
  {
    name: 'Bluesky',
    icon: SiBluesky,
    url: 'https://bluesky.social',
  },
  {
    name: 'Reddit',
    icon: SiReddit,
    url: 'https://reddit.com',
  },
  {
    name: 'Discord',
    icon: SiDiscord,
    url: 'https://discord.com',
  },
  {
    name: 'Telegram',
    icon: SiTelegram,
    url: 'https://telegram.org',
  }
];

const Example = () => (
  <div className="flex flex-col gap-16 px-8 py-24 text-center">
    <div className="flex flex-col items-center justify-center gap-8">
      <Link href="https://github.com/DeltaCream/daredevil">
        <Announcement>
          <AnnouncementTag>Beta</AnnouncementTag>
          <AnnouncementTitle>The website is undergoing many changes!</AnnouncementTitle>
        </Announcement>
      </Link>
      <h1 className="mb-0 text-balance font-medium text-6xl md:text-7xl xl:text-[5.25rem]">
        The grand exploration of ideas
      </h1>
      <p className="mt-0 mb-0 text-balance text-lg text-muted-foreground">
        This is a project website which aims to create a space to share ideas with the world. It showcases various ideas and topics worth checking out.
      </p>
      <div className="flex items-center gap-2">
        <Button asChild>
          <Link href="/register">Get started</Link>
        </Button>
        <Button asChild variant="outline">
          <Link className="no-underline" href="/about">
            Learn more
          </Link>
        </Button>
      </div>
    </div>
    <section className="flex flex-col items-center justify-center gap-8 rounded-xl bg-secondary py-8 pb-18">
      <p className="mb-0 text-balance font-medium text-muted-foreground">
        Present in various platforms!
      </p>
      <div className="flex size-full items-center justify-center">
        <Marquee>
          <MarqueeFade className="from-secondary" side="left" />
          <MarqueeFade className="from-secondary" side="right" />
          <MarqueeContent pauseOnHover={false}>
            {logos.map((logo) => (
              <MarqueeItem className="mx-16 size-12" key={logo.name}>
                <Link href={logo.url}>
                  <logo.icon className="size-full" />
                </Link>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
    </section>
    <VideoPlayer className="overflow-hidden rounded-lg border" key={`video-player`}>
      <VideoPlayerContent
        crossOrigin=""
        muted
        preload="auto"
        slot="media"
        src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4"
      />
      <VideoPlayerControlBar key={'video-player-control-bar'}>
        <VideoPlayerPlayButton key={'video-player-play-button'}/>
        <VideoPlayerSeekBackwardButton key={'video-player-seek-backward-button'}/>
        <VideoPlayerSeekForwardButton key={'video-player-seek-forward-button'}/>
        <VideoPlayerTimeRange key={'video-player-time-range'}/>
        <VideoPlayerTimeDisplay showDuration key={'video-player-duration'}/>
        <VideoPlayerMuteButton key={'video-player-mute-button'}/>
        <VideoPlayerVolumeRange key={'video-player-volume-range'}/>
      </VideoPlayerControlBar>
    </VideoPlayer>
  </div>
);

export default Example;
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useMediaQuery } from 'react-responsive'
// Helpers
import {
  Epg,
  Layout,
  // Channel,
  // GridItemProps,
  // Program,
  useEpg,
  // ChannelItem as IChannelItem,
  ChannelBox,
  ChannelLogo,
} from 'planby'
import {
  Col,
  Row,
  OverlayTrigger,
  Popover,
  Button,
  Form,
} from 'react-bootstrap'

// Import theme
// import { theme } from './helpers/theme'

const epgs = [
  {
    id: 'f8a8aefd-37c9-4d71-89f5-f51b7f032191',
    description: 'Face to face secondary parallelism',
    title: 'Claudia Russel',
    since: '2023-08-20T10:00:00',
    till: '2023-08-20T11:00:00',
    trackId: '368358e0-25ca-4ec9-90c6-db659968f8a2',
    image: 'https://avatars.dicebear.com/api/miniavs/Jessie Bednar.svg',
    country: 'Tonga',
    Title: 'Illenium',
    Year: '2017–',
    Rated: 'TV-14',
    Released: '25 Sep 2017',
    Runtime: '41 min',
    Genre: 'Drama',
    Director: 'N/A',
    Writer: 'David Shore',
    Actors: 'Freddie Highmore, Hill Harper, Richard Schiff',
    Plot: 'Shaun Murphy, a young surgeon with autism and Savant syndrome, is recruited into the surgical unit of a prestigious hospital.',
    Language: 'English',
    Country: 'United States',
    Awards: '4 wins & 20 nominations',
    Metascore: 'N/A',
    imdbRating: '8.1',
    imdbVotes: '84,759',
    imdbID: 'tt6470478',
    Type: 'series',
    totalSeasons: '5',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.1/10' }],
    rating: 4,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png',
    liveMusicStreamID: 'qqt6YxAZoOc',
  },
  {
    id: '7110698e-4ee1-4405-801f-d7eb721fa397',
    description: 'Switchable full-range concept',
    title: 'Melba Daugherty',
    since: '2023-08-20T11:00:00',
    till: '2023-08-20T12:00:00',
    trackId: '368358e0-25ca-4ec9-90c6-db659968f8a2',
    image: 'https://avatars.dicebear.com/api/miniavs/Dana Fahey.svg',
    country: 'Dominican Republic',
    Title: 'Illenium',
    Year: '2017–',
    Rated: 'TV-14',
    Released: '25 Sep 2017',
    Runtime: '41 min',
    Genre: 'Drama',
    Director: 'N/A',
    Writer: 'David Shore',
    Actors: 'Freddie Highmore, Hill Harper, Richard Schiff',
    Plot: 'Shaun Murphy, a young surgeon with autism and Savant syndrome, is recruited into the surgical unit of a prestigious hospital.',
    Language: 'English',
    Country: 'United States',
    Awards: '4 wins & 20 nominations',
    Metascore: 'N/A',
    imdbRating: '8.1',
    imdbVotes: '84,759',
    imdbID: 'tt6470478',
    Type: 'series',
    totalSeasons: '5',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.1/10' }],
    rating: 5,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png',
    liveMusicStreamID: 'rxlJRydqmk8',
  },
  {
    id: 'ed41f264-6d78-4798-aa21-ea3e6425a4e8',
    description: 'Managed well-modulated flexibility',
    title: 'Keith Bradtke',
    since: '2023-08-20T12:00:00',
    till: '2023-08-20T13:00:00',
    trackId: '368358e0-25ca-4ec9-90c6-db659968f8a2',
    image: 'https://avatars.dicebear.com/api/miniavs/Jennie Lynch.svg',
    country: 'Bangladesh',
    Title: 'ODESZA',
    Year: '2018–',
    Rated: 'N/A',
    Released: '20 Feb 2018',
    Runtime: 'N/A',
    Genre: 'Comedy',
    Director: 'N/A',
    Writer: 'N/A',
    Actors: 'Trevor Noah, Ronny Chieng, Michael Kosta',
    Plot: 'Listen to highlights and extended interviews in the "Ears Edition" of The Daily Show with Trevor Noah. From Comedy Central\'s Podcast Network.',
    Language: 'English',
    Country: 'United States',
    Awards: 'N/A',
    Metascore: 'N/A',
    imdbRating: 'N/A',
    imdbVotes: 'N/A',
    imdbID: 'tt13916212',
    Type: 'series',
    totalSeasons: 'N/A',
    Response: 'True',
    Ratings: [],
    rating: 1,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png',
    liveMusicStreamID: 'e-5obm1G_FY',
  },
  {
    id: '4f010907-f99e-4f40-acb3-d63927b081c5',
    description: 'Open-architected bi-directional capacity',
    title: 'Bridget Bins',
    since: '2023-08-20T13:00:00',
    till: '2023-08-20T14:00:00',
    trackId: '368358e0-25ca-4ec9-90c6-db659968f8a2',
    image: 'https://avatars.dicebear.com/api/miniavs/Marsha Haag.svg',
    country: 'Greece',
    Title: 'Major Lazer',
    Year: '1994–2004',
    Rated: 'TV-PG',
    Released: '22 Sep 1994',
    Runtime: '22 min',
    Genre: 'Comedy, Romance',
    Director: 'N/A',
    Writer: 'David Crane, Marta Kauffman',
    Actors: 'Jennifer Aniston, Courteney Cox, Lisa Kudrow',
    Plot: 'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.',
    Language: 'English, Spanish, Italian, French, Dutch, Hebrew',
    Country: 'United States',
    Awards: 'Won 6 Primetime Emmys. 77 wins & 220 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.8',
    imdbVotes: '928,567',
    imdbID: 'tt0108778',
    Type: 'series',
    totalSeasons: '10',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.8/10' }],
    rating: 4,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png',
    liveMusicStreamID: 'rxlJRydqmk8',
  },
  {
    id: '710dae3a-083d-43e1-8504-40c462f20c80',
    description: 'Reverse-engineered uniform interface',
    title: 'Ebony Schultz',
    since: '2023-08-20T14:00:00',
    till: '2023-08-20T14:20:00',
    trackId: '368358e0-25ca-4ec9-90c6-db659968f8a2',
    image: 'https://avatars.dicebear.com/api/miniavs/Mercedes Jenkins.svg',
    country: 'Cayman Islands',
    Title: 'Armin van Buuren',
    Year: '1993–2009',
    Rated: 'TV-14',
    Released: '13 Sep 1993',
    Runtime: '60 min',
    Genre: 'Comedy, Music, Talk-Show',
    Director: 'N/A',
    Writer: 'N/A',
    Actors: "Conan O'Brien, The Max Weinberg 7, Andy Richter",
    Plot: "Conan O'Brien, a Harvard Lampoon alumnus, hosts this late-night comedy/talk-show, which is often silly and whimsical.",
    Language: 'English',
    Country: 'United States',
    Awards: 'Won 1 Primetime Emmy. 8 wins & 55 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.1',
    imdbVotes: '17,900',
    imdbID: 'tt0106052',
    Type: 'series',
    totalSeasons: '17',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.1/10' }],
    rating: 5,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png',
    liveMusicStreamID: 'c8hvW14VdkY',
  },
  {
    id: '81805247-1a99-40c6-8376-8e8a5a226a0a',
    description: 'User-friendly uniform attitude',
    title: 'Wilma Baumbach',
    since: '2023-08-20T14:20:00',
    till: '2023-08-20T15:00:00',
    trackId: '368358e0-25ca-4ec9-90c6-db659968f8a2',
    image: 'https://avatars.dicebear.com/api/miniavs/Ms. Doris Dicki.svg',
    country: 'Bosnia and Herzegovina',
    Title: 'Major Lazer',
    Year: '1994–2004',
    Rated: 'TV-PG',
    Released: '22 Sep 1994',
    Runtime: '22 min',
    Genre: 'Comedy, Romance',
    Director: 'N/A',
    Writer: 'David Crane, Marta Kauffman',
    Actors: 'Jennifer Aniston, Courteney Cox, Lisa Kudrow',
    Plot: 'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.',
    Language: 'English, Spanish, Italian, French, Dutch, Hebrew',
    Country: 'United States',
    Awards: 'Won 6 Primetime Emmys. 77 wins & 220 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.8',
    imdbVotes: '928,567',
    imdbID: 'tt0108778',
    Type: 'series',
    totalSeasons: '10',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.8/10' }],
    rating: 1,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png',
    liveMusicStreamID: 'SrNQS8J67zc',
  },
  {
    id: 'c7049388-6c2f-49c4-b5a5-e288b4f0044c',
    description: 'Multi-tiered intermediate hierarchy',
    title: 'Dominic Jones',
    since: '2023-08-20T15:00:00',
    till: '2023-08-20T16:00:00',
    trackId: '368358e0-25ca-4ec9-90c6-db659968f8a2',
    image: 'https://avatars.dicebear.com/api/miniavs/Josefina Pouros.svg',
    country: 'Cook Islands',
    Title: 'Illenium',
    Year: '2017–',
    Rated: 'TV-14',
    Released: '25 Sep 2017',
    Runtime: '41 min',
    Genre: 'Drama',
    Director: 'N/A',
    Writer: 'David Shore',
    Actors: 'Freddie Highmore, Hill Harper, Richard Schiff',
    Plot: 'Shaun Murphy, a young surgeon with autism and Savant syndrome, is recruited into the surgical unit of a prestigious hospital.',
    Language: 'English',
    Country: 'United States',
    Awards: '4 wins & 20 nominations',
    Metascore: 'N/A',
    imdbRating: '8.1',
    imdbVotes: '84,759',
    imdbID: 'tt6470478',
    Type: 'series',
    totalSeasons: '5',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.1/10' }],
    rating: 4,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png',
    liveMusicStreamID: 'rtmFCcjEgEw',
  },
  {
    id: '17139451-e735-49b9-8699-642f42f40ff0',
    description: 'Self-enabling content-based secured line',
    title: 'Darin Hansen',
    since: '2023-08-20T10:00:00',
    till: '2023-08-20T11:00:00',
    trackId: '1c32397f-fb76-45f5-aa05-592ad4118e6d',
    image: 'https://avatars.dicebear.com/api/miniavs/Cecilia Hudson.svg',
    country: 'Nauru',
    Title: 'Armin van Buuren',
    Year: '1993–2009',
    Rated: 'TV-14',
    Released: '13 Sep 1993',
    Runtime: '60 min',
    Genre: 'Comedy, Music, Talk-Show',
    Director: 'N/A',
    Writer: 'N/A',
    Actors: "Conan O'Brien, The Max Weinberg 7, Andy Richter",
    Plot: "Conan O'Brien, a Harvard Lampoon alumnus, hosts this late-night comedy/talk-show, which is often silly and whimsical.",
    Language: 'English',
    Country: 'United States',
    Awards: 'Won 1 Primetime Emmy. 8 wins & 55 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.1',
    imdbVotes: '17,900',
    imdbID: 'tt0106052',
    Type: 'series',
    totalSeasons: '17',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.1/10' }],
    rating: 1,
    logo: 'https://github.com/aarjithn/frontend-logos/blob/master/app/images/logos/1ec9cb73f2aac4884b7014ca4a7d8789.png?raw=true',
    liveMusicStreamID: 'SrNQS8J67zc',
  },
  {
    id: '240c287a-643a-4f59-ab46-1c3cfe7e9cc5',
    description: 'Balanced web-enabled framework',
    title: 'Earl Mitchell',
    since: '2023-08-20T11:00:00',
    till: '2023-08-20T12:00:00',
    trackId: '1c32397f-fb76-45f5-aa05-592ad4118e6d',
    image: 'https://avatars.dicebear.com/api/miniavs/Dr. Vicky Gleichner.svg',
    country: 'Wallis and Futuna',
    Title: 'RUFUS DU SOL',
    Year: '2022–',
    Rated: 'TV-Y7',
    Released: 'N/A',
    Runtime: 'N/A',
    Genre: 'Adventure, Comedy, Family',
    Director: 'N/A',
    Writer: 'N/A',
    Actors: 'Audrey Grace Marshall, Ryan-James Hatanaka, Daran Norris',
    Plot: 'Follow Timmy Turner\'s cousin, Vivian "Viv" Turner, and her new stepbrother, Roy Ragland, as they navigate life in Dimmsdale with the help of their fairy godparents, Wanda and Cosmo.',
    Language: 'English',
    Country: 'United States',
    Awards: 'N/A',
    Metascore: 'N/A',
    imdbRating: 'N/A',
    imdbVotes: 'N/A',
    imdbID: 'tt15057532',
    Type: 'series',
    totalSeasons: '1',
    Response: 'True',
    Ratings: [],
    rating: 4,
    logo: 'https://github.com/aarjithn/frontend-logos/blob/master/app/images/logos/1ec9cb73f2aac4884b7014ca4a7d8789.png?raw=true',
    liveMusicStreamID: 'jo-1EUxMmxc',
  },
  {
    id: '3a3236f5-ded5-4f29-a767-e353079bdbe1',
    description: 'Universal discrete protocol',
    title: 'Jerome Hickle',
    since: '2023-08-20T12:00:00',
    till: '2023-08-20T13:00:00',
    trackId: '1c32397f-fb76-45f5-aa05-592ad4118e6d',
    image: 'https://avatars.dicebear.com/api/miniavs/Luke Marks I.svg',
    country: 'Cayman Islands',
    Title: ' Skrillex',
    Year: '2014–',
    Rated: 'TV-PG',
    Released: '07 Oct 2014',
    Runtime: '43 min',
    Genre: 'Action, Adventure, Drama',
    Director: 'N/A',
    Writer: 'Greg Berlanti, Geoff Johns, Andrew Kreisberg',
    Actors: 'Grant Gustin, Candice Patton, Danielle Panabaker',
    Plot: "After being struck by lightning, Barry Allen wakes up from his coma to discover he's been given the power of super speed, becoming the Flash, fighting crime in Central City.",
    Language: 'English',
    Country: 'United States',
    Awards: 'Nominated for 1 Primetime Emmy. 29 wins & 90 nominations total',
    Metascore: 'N/A',
    imdbRating: '7.6',
    imdbVotes: '331,912',
    imdbID: 'tt3107288',
    Type: 'series',
    totalSeasons: '8',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '7.6/10' }],
    rating: 4,
    logo: 'https://github.com/aarjithn/frontend-logos/blob/master/app/images/logos/1ec9cb73f2aac4884b7014ca4a7d8789.png?raw=true',
    liveMusicStreamID: 'pws4qzGn5ak',
  },
  {
    id: 'efe4c045-5b5f-4279-8daf-23b6d14e7917',
    description: 'Multi-layered mobile model',
    title: 'Mercedes Hand',
    since: '2023-08-20T13:00:00',
    till: '2023-08-20T14:00:00',
    trackId: '1c32397f-fb76-45f5-aa05-592ad4118e6d',
    image: 'https://avatars.dicebear.com/api/miniavs/Vernon Hauck DVM.svg',
    country: 'Saint Vincent and the Grenadines',
    Title: 'Sonny Fedora',
    Year: '2019–',
    Rated: 'TV-MA',
    Released: '16 Jun 2019',
    Runtime: '55 min',
    Genre: 'Drama',
    Director: 'N/A',
    Writer: 'Sam Levinson',
    Actors: 'Hunter Schafer, Zendaya, Angus Cloud',
    Plot: 'A look at life for a group of high school students as they grapple with issues of drugs, sex, and violence.',
    Language: 'English',
    Country: 'United States',
    Awards: 'Won 3 Primetime Emmys. 15 wins & 47 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.4',
    imdbVotes: '101,822',
    imdbID: 'tt8772296',
    Type: 'series',
    totalSeasons: '2',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.4/10' }],
    rating: 5,
    logo: 'https://github.com/aarjithn/frontend-logos/blob/master/app/images/logos/1ec9cb73f2aac4884b7014ca4a7d8789.png?raw=true',
    liveMusicStreamID: 'jo-1EUxMmxc',
  },
  {
    id: 'ca957d21-0388-4535-9256-b1b5f436bf7e',
    description: 'Front-line logistical complexity',
    title: 'Denise Brekke',
    since: '2023-08-20T14:00:00',
    till: '2023-08-20T15:00:00',
    trackId: '1c32397f-fb76-45f5-aa05-592ad4118e6d',
    image: 'https://avatars.dicebear.com/api/miniavs/Josephine Schuppe.svg',
    country: 'Anguilla',
    Title: ' Meduza',
    Year: '2021–',
    Rated: 'TV-MA',
    Released: '24 Dec 2021',
    Runtime: 'N/A',
    Genre: 'Adventure, Drama, Mystery',
    Director: 'N/A',
    Writer: 'N/A',
    Actors: 'Bae Doona, Gong Yoo, Joon Lee',
    Plot: 'During a perilous 24-hour mission on the moon, space explorers try to retrieve samples from an abandoned research facility steeped in classified secrets.',
    Language: 'Korean',
    Country: 'South Korea',
    Awards: 'N/A',
    Metascore: 'N/A',
    imdbRating: '6.9',
    imdbVotes: '13,008',
    imdbID: 'tt11570202',
    Type: 'series',
    totalSeasons: '1',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '6.9/10' }],
    rating: 3,
    logo: 'https://github.com/aarjithn/frontend-logos/blob/master/app/images/logos/1ec9cb73f2aac4884b7014ca4a7d8789.png?raw=true',
    liveMusicStreamID: 'rtmFCcjEgEw',
  },
  {
    id: 'da7fe7e2-f584-4697-8129-25394464d250',
    description: 'Managed context-sensitive framework',
    title: 'Christopher Romaguera',
    since: '2023-08-20T15:00:00',
    till: '2023-08-20T16:00:00',
    trackId: '1c32397f-fb76-45f5-aa05-592ad4118e6d',
    image: 'https://avatars.dicebear.com/api/miniavs/Roy Botsford.svg',
    country: 'Serbia',
    Title: 'Oliver Heldens',
    Year: '1999–',
    Rated: 'TV-Y',
    Released: '01 May 1999',
    Runtime: '23 min',
    Genre: 'Animation, Comedy, Family',
    Director: 'N/A',
    Writer: 'Stephen Hillenburg, Tim Hill, Nick Jennings',
    Actors: 'Tom Kenny, Bill Fagerbakke, Rodger Bumpass',
    Plot: 'The misadventures of a talking sea sponge who works at a fast food restaurant, attends a boating school, and lives in an underwater pineapple.',
    Language: 'English, Irish Gaelic, Korean',
    Country: 'United States',
    Awards: 'Nominated for 10 Primetime Emmys. 55 wins & 63 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.2',
    imdbVotes: '91,921',
    imdbID: 'tt0206512',
    Type: 'series',
    totalSeasons: '13',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.2/10' }],
    rating: 4,
    logo: 'https://github.com/aarjithn/frontend-logos/blob/master/app/images/logos/1ec9cb73f2aac4884b7014ca4a7d8789.png?raw=true',
    liveMusicStreamID: '8aGhZQkoFbQI',
  },
  {
    id: '2e5bfe50-12bb-4732-9842-82092e229e2b',
    description: 'Advanced clear-thinking budgetary management',
    title: 'Kristopher Bauch',
    since: '2023-08-20T10:00:00',
    till: '2023-08-20T10:35:00',
    trackId: 'fb042781-4228-4080-95b9-229e3bd53b6a',
    image: 'https://avatars.dicebear.com/api/miniavs/Veronica Barrows V.svg',
    country: 'Guatemala',
    Title: 'Oliver Heldens',
    Year: '1999–',
    Rated: 'TV-Y',
    Released: '01 May 1999',
    Runtime: '23 min',
    Genre: 'Animation, Comedy, Family',
    Director: 'N/A',
    Writer: 'Stephen Hillenburg, Tim Hill, Nick Jennings',
    Actors: 'Tom Kenny, Bill Fagerbakke, Rodger Bumpass',
    Plot: 'The misadventures of a talking sea sponge who works at a fast food restaurant, attends a boating school, and lives in an underwater pineapple.',
    Language: 'English, Irish Gaelic, Korean',
    Country: 'United States',
    Awards: 'Nominated for 10 Primetime Emmys. 55 wins & 63 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.2',
    imdbVotes: '91,921',
    imdbID: 'tt0206512',
    Type: 'series',
    totalSeasons: '13',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.2/10' }],
    rating: 2,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/nodejs-icon.svg',
    liveMusicStreamID: 'e-5obm1G_FY',
  },
  {
    id: 'd6ef167b-445b-486f-baac-33c8d0592b4d',
    description: 'Total bandwidth-monitored open system',
    title: 'Brooke Kuphal',
    since: '2023-08-20T10:35:00',
    till: '2023-08-20T11:30:00',
    trackId: 'fb042781-4228-4080-95b9-229e3bd53b6a',
    image: 'https://avatars.dicebear.com/api/miniavs/Stewart Raynor.svg',
    country: 'Palestinian Territories',
    Title: 'Martin Garrix',
    Year: '2005–2014',
    Rated: 'TV-14',
    Released: '19 Sep 2005',
    Runtime: '22 min',
    Genre: 'Comedy, Romance',
    Director: 'N/A',
    Writer: 'Carter Bays, Craig Thomas',
    Actors: 'Josh Radnor, Jason Segel, Cobie Smulders',
    Plot: 'A father recounts to his children - through a series of flashbacks - the journey he and his four best friends took leading up to him meeting their mother.',
    Language: 'English, Persian, Chinese',
    Country: 'United States',
    Awards: 'Won 10 Primetime Emmys. 26 wins & 95 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.3',
    imdbVotes: '647,227',
    imdbID: 'tt0460649',
    Type: 'series',
    totalSeasons: '9',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.3/10' }],
    rating: 1,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/nodejs-icon.svg',
    liveMusicStreamID: 'e-5obm1G_FY',
  },
  {
    id: 'ab665c52-bf01-4c14-8acc-a84a5679f234',
    description: 'Up-sized 6th generation open architecture',
    title: 'Sonya Carter',
    since: '2023-08-20T11:30:00',
    till: '2023-08-20T12:35:00',
    trackId: 'fb042781-4228-4080-95b9-229e3bd53b6a',
    image: 'https://avatars.dicebear.com/api/miniavs/Marlon Dickinson.svg',
    country: 'United Arab Emirates',
    Title: 'Afrojack',
    Year: '1999–',
    Rated: 'TV-Y',
    Released: '01 May 1999',
    Runtime: '23 min',
    Genre: 'Animation, Comedy, Family',
    Director: 'N/A',
    Writer: 'Stephen Hillenburg, Tim Hill, Nick Jennings',
    Actors: 'Tom Kenny, Bill Fagerbakke, Rodger Bumpass',
    Plot: 'The misadventures of a talking sea sponge who works at a fast food restaurant, attends a boating school, and lives in an underwater pineapple.',
    Language: 'English, Irish Gaelic, Korean',
    Country: 'United States',
    Awards: 'Nominated for 10 Primetime Emmys. 55 wins & 63 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.2',
    imdbVotes: '91,921',
    imdbID: 'tt0206512',
    Type: 'series',
    totalSeasons: '13',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.2/10' }],
    rating: 2,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/nodejs-icon.svg',
    liveMusicStreamID: 'e-5obm1G_FY',
  },
  {
    id: '5a1c7b9a-b1fc-4022-bcac-00f18313d976',
    description: 'Devolved radical complexity',
    title: 'Ora Legros Jr.',
    since: '2023-08-20T12:35:00',
    till: '2023-08-20T13:05:00',
    trackId: 'fb042781-4228-4080-95b9-229e3bd53b6a',
    image: 'https://avatars.dicebear.com/api/miniavs/Brooke Schulist.svg',
    country: 'Haiti',
    Title: 'Armin van Buuren',
    Year: '1993–2009',
    Rated: 'TV-14',
    Released: '13 Sep 1993',
    Runtime: '60 min',
    Genre: 'Comedy, Music, Talk-Show',
    Director: 'N/A',
    Writer: 'N/A',
    Actors: "Conan O'Brien, The Max Weinberg 7, Andy Richter",
    Plot: "Conan O'Brien, a Harvard Lampoon alumnus, hosts this late-night comedy/talk-show, which is often silly and whimsical.",
    Language: 'English',
    Country: 'United States',
    Awards: 'Won 1 Primetime Emmy. 8 wins & 55 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.1',
    imdbVotes: '17,900',
    imdbID: 'tt0106052',
    Type: 'series',
    totalSeasons: '17',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.1/10' }],
    rating: 4,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/nodejs-icon.svg',
    liveMusicStreamID: 'SrNQS8J67zc',
  },
  {
    id: '866b5188-8aea-469b-ad89-79cba0c48e47',
    description: 'Future-proofed 6th generation alliance',
    title: 'Ethel Rice',
    since: '2023-08-20T13:05:00',
    till: '2023-08-20T13:35:00',
    trackId: 'fb042781-4228-4080-95b9-229e3bd53b6a',
    image: 'https://avatars.dicebear.com/api/miniavs/Constance Langworth.svg',
    country: 'Latvia',
    Title: 'Martin Garrix',
    Year: '2005–2014',
    Rated: 'TV-14',
    Released: '19 Sep 2005',
    Runtime: '22 min',
    Genre: 'Comedy, Romance',
    Director: 'N/A',
    Writer: 'Carter Bays, Craig Thomas',
    Actors: 'Josh Radnor, Jason Segel, Cobie Smulders',
    Plot: 'A father recounts to his children - through a series of flashbacks - the journey he and his four best friends took leading up to him meeting their mother.',
    Language: 'English, Persian, Chinese',
    Country: 'United States',
    Awards: 'Won 10 Primetime Emmys. 26 wins & 95 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.3',
    imdbVotes: '647,227',
    imdbID: 'tt0460649',
    Type: 'series',
    totalSeasons: '9',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.3/10' }],
    rating: 4,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/nodejs-icon.svg',
    liveMusicStreamID: 'pws4qzGn5ak',
  },
  {
    id: 'ad479768-ef03-4664-881a-dc2e2b321b19',
    description: 'Versatile 5th generation Graphical User Interface',
    title: 'Pauline Feeney MD',
    since: '2023-08-20T13:35:00',
    till: '2023-08-20T14:35:00',
    trackId: 'fb042781-4228-4080-95b9-229e3bd53b6a',
    image: 'https://avatars.dicebear.com/api/miniavs/Pedro Ward.svg',
    country: 'Norfolk Island',
    Title: 'Illenium',
    Year: '2017–',
    Rated: 'TV-14',
    Released: '25 Sep 2017',
    Runtime: '41 min',
    Genre: 'Drama',
    Director: 'N/A',
    Writer: 'David Shore',
    Actors: 'Freddie Highmore, Hill Harper, Richard Schiff',
    Plot: 'Shaun Murphy, a young surgeon with autism and Savant syndrome, is recruited into the surgical unit of a prestigious hospital.',
    Language: 'English',
    Country: 'United States',
    Awards: '4 wins & 20 nominations',
    Metascore: 'N/A',
    imdbRating: '8.1',
    imdbVotes: '84,759',
    imdbID: 'tt6470478',
    Type: 'series',
    totalSeasons: '5',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.1/10' }],
    rating: 5,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/nodejs-icon.svg',
    liveMusicStreamID: 'pws4qzGn5ak',
  },
  {
    id: '45d74e31-5096-4838-9278-a723f0477954',
    description: 'Self-enabling incremental alliance',
    title: 'Marc Schmeler',
    since: '2023-08-20T14:35:00',
    till: '2023-08-20T15:45:00',
    trackId: 'fb042781-4228-4080-95b9-229e3bd53b6a',
    image: 'https://avatars.dicebear.com/api/miniavs/Gayle Halvorson.svg',
    country: 'Suriname',
    Title: 'Don Diablo',
    Year: '2021–',
    Rated: 'TV-14',
    Released: '29 Dec 2021',
    Runtime: 'N/A',
    Genre: 'Action, Adventure, Sci-Fi',
    Director: 'N/A',
    Writer: 'Jon Favreau',
    Actors: 'Temuera Morrison, Ming-Na Wen, Matt Berry',
    Plot: "Bounty hunter Boba Fett & mercenary Fennec Shand navigate the underworld when they return to Tatooine to claim Jabba the Hutt's old turf.",
    Language: 'English',
    Country: 'United States',
    Awards: 'N/A',
    Metascore: 'N/A',
    imdbRating: '8.0',
    imdbVotes: '20,147',
    imdbID: 'tt13668894',
    Type: 'series',
    totalSeasons: '1',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.0/10' }],
    rating: 1,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/nodejs-icon.svg',
    liveMusicStreamID: 'pws4qzGn5ak',
  },
  {
    id: '9f47ef44-4202-4639-9a01-5b108fa810d5',
    description: 'Optional value-added analyzer',
    title: 'Lela Ziemann PhD',
    since: '2023-08-20T15:45:00',
    till: '2023-08-20T16:00:00',
    trackId: 'fb042781-4228-4080-95b9-229e3bd53b6a',
    image: 'https://avatars.dicebear.com/api/miniavs/Mr. Susie Abshire.svg',
    country: 'United States',
    Title: 'Afrojack',
    Year: '1999–',
    Rated: 'TV-Y',
    Released: '01 May 1999',
    Runtime: '23 min',
    Genre: 'Animation, Comedy, Family',
    Director: 'N/A',
    Writer: 'Stephen Hillenburg, Tim Hill, Nick Jennings',
    Actors: 'Tom Kenny, Bill Fagerbakke, Rodger Bumpass',
    Plot: 'The misadventures of a talking sea sponge who works at a fast food restaurant, attends a boating school, and lives in an underwater pineapple.',
    Language: 'English, Irish Gaelic, Korean',
    Country: 'United States',
    Awards: 'Nominated for 10 Primetime Emmys. 55 wins & 63 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.2',
    imdbVotes: '91,921',
    imdbID: 'tt0206512',
    Type: 'series',
    totalSeasons: '13',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.2/10' }],
    rating: 3,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/nodejs-icon.svg',
    liveMusicStreamID: 'p-iiEDtpy6I',
  },
  {
    id: '7cb73700-dc74-47ae-bf54-f7d064565abf',
    description: 'Cross-group reciprocal focus group',
    title: 'Marcia Lakin',
    since: '2023-08-20T10:00:00',
    till: '2023-08-20T11:00:00',
    trackId: 'be37b383-18b2-4ab5-8973-263a38add4fc',
    image: 'https://avatars.dicebear.com/api/miniavs/Celia Toy.svg',
    country: 'Tonga',
    Title: 'DJ Snake',
    Year: '2003–2015',
    Rated: 'TV-14',
    Released: '22 Sep 2003',
    Runtime: '22 min',
    Genre: 'Comedy, Romance',
    Director: 'N/A',
    Writer: 'Lee Aronsohn, Chuck Lorre',
    Actors: 'Jon Cryer, Ashton Kutcher, Angus T. Jones',
    Plot: "A hedonistic jingle writer's free-wheeling life comes to an abrupt halt when his brother and 10-year-old nephew move into his beach-front house.",
    Language: 'English',
    Country: 'United States',
    Awards: 'Won 9 Primetime Emmys. 30 wins & 72 nominations total',
    Metascore: 'N/A',
    imdbRating: '7.0',
    imdbVotes: '253,658',
    imdbID: 'tt0369179',
    Type: 'series',
    totalSeasons: '12',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '7.0/10' }],
    rating: 2,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/nestjs.svg',
    liveMusicStreamID: 'c8hvW14VdkY',
  },
  {
    id: '423a0717-8773-4683-a55e-3454e2ab6452',
    description: 'Diverse leading edge policy',
    title: 'Charlie Hegmann IV',
    since: '2023-08-20T11:00:00',
    till: '2023-08-20T12:00:00',
    trackId: 'be37b383-18b2-4ab5-8973-263a38add4fc',
    image: 'https://avatars.dicebear.com/api/miniavs/Michele Schaden.svg',
    country: 'Dominican Republic',
    Title: 'Lost Frequencies',
    Year: '2013–2022',
    Rated: 'TV-MA',
    Released: '30 Sep 2014',
    Runtime: '60 min',
    Genre: 'Crime, Drama',
    Director: 'N/A',
    Writer: 'Steven Knight',
    Actors: 'Cillian Murphy, Paul Anderson, Helen McCrory',
    Plot: 'A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.',
    Language: 'English, Romanian, Irish Gaelic, Italian, Yiddish',
    Country: 'United Kingdom',
    Awards: 'Won 1 BAFTA Film Award21 wins & 47 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.8',
    imdbVotes: '441,495',
    imdbID: 'tt2442560',
    Type: 'series',
    totalSeasons: '6',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.8/10' }],
    rating: 3,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/nestjs.svg',
    liveMusicStreamID: 'pws4qzGn5ak',
  },
  {
    id: 'e8eff154-5bb3-4d14-8929-7b7c94bc7c85',
    description: 'Optimized needs-based parallelism',
    title: 'Ms. David Rohan',
    since: '2023-08-20T12:00:00',
    till: '2023-08-20T13:00:00',
    trackId: 'be37b383-18b2-4ab5-8973-263a38add4fc',
    image: 'https://avatars.dicebear.com/api/miniavs/Katrina Blick.svg',
    country: 'Bangladesh',
    Title: ' Skrillex',
    Year: '2014–',
    Rated: 'TV-PG',
    Released: '07 Oct 2014',
    Runtime: '43 min',
    Genre: 'Action, Adventure, Drama',
    Director: 'N/A',
    Writer: 'Greg Berlanti, Geoff Johns, Andrew Kreisberg',
    Actors: 'Grant Gustin, Candice Patton, Danielle Panabaker',
    Plot: "After being struck by lightning, Barry Allen wakes up from his coma to discover he's been given the power of super speed, becoming the Flash, fighting crime in Central City.",
    Language: 'English',
    Country: 'United States',
    Awards: 'Nominated for 1 Primetime Emmy. 29 wins & 90 nominations total',
    Metascore: 'N/A',
    imdbRating: '7.6',
    imdbVotes: '331,912',
    imdbID: 'tt3107288',
    Type: 'series',
    totalSeasons: '8',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '7.6/10' }],
    rating: 3,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/nestjs.svg',
    liveMusicStreamID: 'qqt6YxAZoOc',
  },
  {
    id: 'f28b2cb0-99e3-41df-96f5-5c372dcbaee7',
    description: 'Programmable scalable capability',
    title: 'Ana Moen',
    since: '2023-08-20T13:00:00',
    till: '2023-08-20T14:00:00',
    trackId: 'be37b383-18b2-4ab5-8973-263a38add4fc',
    image: 'https://avatars.dicebear.com/api/miniavs/Vincent Cummerata.svg',
    country: 'Greece',
    Title: 'Afrojack',
    Year: '1999–',
    Rated: 'TV-Y',
    Released: '01 May 1999',
    Runtime: '23 min',
    Genre: 'Animation, Comedy, Family',
    Director: 'N/A',
    Writer: 'Stephen Hillenburg, Tim Hill, Nick Jennings',
    Actors: 'Tom Kenny, Bill Fagerbakke, Rodger Bumpass',
    Plot: 'The misadventures of a talking sea sponge who works at a fast food restaurant, attends a boating school, and lives in an underwater pineapple.',
    Language: 'English, Irish Gaelic, Korean',
    Country: 'United States',
    Awards: 'Nominated for 10 Primetime Emmys. 55 wins & 63 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.2',
    imdbVotes: '91,921',
    imdbID: 'tt0206512',
    Type: 'series',
    totalSeasons: '13',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.2/10' }],
    rating: 4,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/nestjs.svg',
    liveMusicStreamID: 'c8hvW14VdkY',
  },
  {
    id: 'de957e96-121a-40d9-8ada-9c8da11913ef',
    description: 'Devolved empowering orchestration',
    title: 'Mae Grant',
    since: '2023-08-20T14:00:00',
    till: '2023-08-20T14:20:00',
    trackId: 'be37b383-18b2-4ab5-8973-263a38add4fc',
    image: 'https://avatars.dicebear.com/api/miniavs/Kelly Blanda.svg',
    country: 'Cayman Islands',
    Title: ' Skrillex',
    Year: '2014–',
    Rated: 'TV-PG',
    Released: '07 Oct 2014',
    Runtime: '43 min',
    Genre: 'Action, Adventure, Drama',
    Director: 'N/A',
    Writer: 'Greg Berlanti, Geoff Johns, Andrew Kreisberg',
    Actors: 'Grant Gustin, Candice Patton, Danielle Panabaker',
    Plot: "After being struck by lightning, Barry Allen wakes up from his coma to discover he's been given the power of super speed, becoming the Flash, fighting crime in Central City.",
    Language: 'English',
    Country: 'United States',
    Awards: 'Nominated for 1 Primetime Emmy. 29 wins & 90 nominations total',
    Metascore: 'N/A',
    imdbRating: '7.6',
    imdbVotes: '331,912',
    imdbID: 'tt3107288',
    Type: 'series',
    totalSeasons: '8',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '7.6/10' }],
    rating: 3,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/nestjs.svg',
    liveMusicStreamID: 'p-iiEDtpy6I',
  },
  {
    id: 'b11e1e1d-5f90-412a-81a2-605a70bbaf26',
    description: 'Virtual local workforce',
    title: 'Tommy Murphy',
    since: '2023-08-20T14:20:00',
    till: '2023-08-20T15:00:00',
    trackId: 'be37b383-18b2-4ab5-8973-263a38add4fc',
    image: 'https://avatars.dicebear.com/api/miniavs/Dr. Gustavo Smith.svg',
    country: 'Bosnia and Herzegovina',
    Title: 'RUFUS DU SOL',
    Year: '2022–',
    Rated: 'TV-Y7',
    Released: 'N/A',
    Runtime: 'N/A',
    Genre: 'Adventure, Comedy, Family',
    Director: 'N/A',
    Writer: 'N/A',
    Actors: 'Audrey Grace Marshall, Ryan-James Hatanaka, Daran Norris',
    Plot: 'Follow Timmy Turner\'s cousin, Vivian "Viv" Turner, and her new stepbrother, Roy Ragland, as they navigate life in Dimmsdale with the help of their fairy godparents, Wanda and Cosmo.',
    Language: 'English',
    Country: 'United States',
    Awards: 'N/A',
    Metascore: 'N/A',
    imdbRating: 'N/A',
    imdbVotes: 'N/A',
    imdbID: 'tt15057532',
    Type: 'series',
    totalSeasons: '1',
    Response: 'True',
    Ratings: [],
    rating: 2,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/nestjs.svg',
    liveMusicStreamID: 'SrNQS8J67zc',
  },
  {
    id: '2545c449-9f72-4972-be46-e077c7231d13',
    description: 'Universal eco-centric workforce',
    title: 'Doug Cormier',
    since: '2023-08-20T15:00:00',
    till: '2023-08-20T16:00:00',
    trackId: 'be37b383-18b2-4ab5-8973-263a38add4fc',
    image: 'https://avatars.dicebear.com/api/miniavs/Shelley Rau.svg',
    country: 'Cook Islands',
    Title: 'Illenium',
    Year: '2017–',
    Rated: 'TV-14',
    Released: '25 Sep 2017',
    Runtime: '41 min',
    Genre: 'Drama',
    Director: 'N/A',
    Writer: 'David Shore',
    Actors: 'Freddie Highmore, Hill Harper, Richard Schiff',
    Plot: 'Shaun Murphy, a young surgeon with autism and Savant syndrome, is recruited into the surgical unit of a prestigious hospital.',
    Language: 'English',
    Country: 'United States',
    Awards: '4 wins & 20 nominations',
    Metascore: 'N/A',
    imdbRating: '8.1',
    imdbVotes: '84,759',
    imdbID: 'tt6470478',
    Type: 'series',
    totalSeasons: '5',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.1/10' }],
    rating: 3,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/nestjs.svg',
    liveMusicStreamID: '8aGhZQkoFbQI',
  },
  {
    id: '3c0be9f2-1d95-4101-b602-e7758a57947a',
    description: 'Diverse composite time-frame',
    title: 'Vernon Kuphal',
    since: '2023-08-20T10:00:00',
    till: '2023-08-20T10:35:00',
    trackId: 'e7f834ae-65e6-4a6d-a9fe-51f1443b79b0',
    image: 'https://avatars.dicebear.com/api/miniavs/Jake Nolan.svg',
    country: 'Guatemala',
    Title: 'Alan Walker',
    Year: '2004–2012',
    Rated: 'TV-14',
    Released: '16 Nov 2004',
    Runtime: '44 min',
    Genre: 'Drama, Mystery',
    Director: 'N/A',
    Writer: 'David Shore',
    Actors: 'Hugh Laurie, Omar Epps, Robert Sean Leonard',
    Plot: 'An antisocial maverick doctor who specializes in diagnostic medicine does whatever it takes to solve puzzling cases that come his way using his crack team of doctors and his wits.',
    Language: 'English',
    Country: 'United States',
    Awards: 'Won 5 Primetime Emmys. 57 wins & 140 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.7',
    imdbVotes: '439,759',
    imdbID: 'tt0412142',
    Type: 'series',
    totalSeasons: '8',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.7/10' }],
    rating: 1,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/docker-icon.svg',
    liveMusicStreamID: 'qqt6YxAZoOc',
  },
  {
    id: 'dbfb9591-84ea-4cbc-9205-7a66d9fa9335',
    description: 'Devolved hybrid hub',
    title: 'Theodore Predovic',
    since: '2023-08-20T10:35:00',
    till: '2023-08-20T11:30:00',
    trackId: 'e7f834ae-65e6-4a6d-a9fe-51f1443b79b0',
    image: 'https://avatars.dicebear.com/api/miniavs/Darren Stoltenberg.svg',
    country: 'Palestinian Territories',
    Title: 'Kygo',
    Year: '1990',
    Rated: 'R',
    Released: '08 Feb 1991',
    Runtime: '100 min',
    Genre: 'Action, Romance, Sci-Fi',
    Director: 'Kevin Tenney',
    Writer: 'Kevin Tenney',
    Actors: 'Robert Forster, Lance Edwards, Hilary Shepard',
    Plot: 'A doctor (Shepard) gets caught up in a war between two aliens (Edwards, Forster).',
    Language: 'English',
    Country: 'United States',
    Awards: 'N/A',
    Metascore: 'N/A',
    imdbRating: '5.3',
    imdbVotes: '567',
    imdbID: 'tt0100343',
    Type: 'movie',
    DVD: 'N/A',
    BoxOffice: 'N/A',
    Production: 'N/A',
    Website: 'N/A',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '5.3/10' }],
    rating: 4,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/docker-icon.svg',
    liveMusicStreamID: 'SrNQS8J67zc',
  },
  {
    id: '83e75c52-075e-40a8-a36a-a3471f3941ab',
    description: 'Multi-lateral composite implementation',
    title: 'Kari Heidenreich',
    since: '2023-08-20T11:30:00',
    till: '2023-08-20T12:35:00',
    trackId: 'e7f834ae-65e6-4a6d-a9fe-51f1443b79b0',
    image: 'https://avatars.dicebear.com/api/miniavs/Santiago Durgan.svg',
    country: 'United Arab Emirates',
    Title: 'Clean Bandit',
    Year: '2000–2006',
    Rated: 'TV-PG',
    Released: '09 Jan 2000',
    Runtime: '22 min',
    Genre: 'Comedy, Family',
    Director: 'N/A',
    Writer: 'Linwood Boomer, Michael Glouberman, Gary Murphy',
    Actors: 'Frankie Muniz, Bryan Cranston, Justin Berfield',
    Plot: 'A gifted young teen tries to survive life with his dimwitted, dysfunctional family.',
    Language: 'English, Latin, Spanish, Italian, French, Chinese',
    Country: 'United States',
    Awards: 'Won 7 Primetime Emmys. 46 wins & 118 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.1',
    imdbVotes: '125,408',
    imdbID: 'tt0212671',
    Type: 'series',
    totalSeasons: '7',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.1/10' }],
    rating: 4,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/docker-icon.svg',
    liveMusicStreamID: '8aGhZQkoFbQI',
  },
  {
    id: '863ad275-c33c-4556-a5f1-578fd2c74771',
    description: 'Devolved well-modulated strategy',
    title: 'Nicholas Hagenes',
    since: '2023-08-20T12:35:00',
    till: '2023-08-20T13:05:00',
    trackId: 'e7f834ae-65e6-4a6d-a9fe-51f1443b79b0',
    image: 'https://avatars.dicebear.com/api/miniavs/June Mayert.svg',
    country: 'Haiti',
    Title: 'Sonny Fedora',
    Year: '2019–',
    Rated: 'TV-MA',
    Released: '16 Jun 2019',
    Runtime: '55 min',
    Genre: 'Drama',
    Director: 'N/A',
    Writer: 'Sam Levinson',
    Actors: 'Hunter Schafer, Zendaya, Angus Cloud',
    Plot: 'A look at life for a group of high school students as they grapple with issues of drugs, sex, and violence.',
    Language: 'English',
    Country: 'United States',
    Awards: 'Won 3 Primetime Emmys. 15 wins & 47 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.4',
    imdbVotes: '101,822',
    imdbID: 'tt8772296',
    Type: 'series',
    totalSeasons: '2',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.4/10' }],
    rating: 4,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/docker-icon.svg',
    liveMusicStreamID: 'qqt6YxAZoOc',
  },
  {
    id: '73b1b040-29bc-45bd-b192-ba2d2cd6c559',
    description: 'Sharable zero administration software',
    title: 'Nina Pagac',
    since: '2023-08-20T13:05:00',
    till: '2023-08-20T13:35:00',
    trackId: 'e7f834ae-65e6-4a6d-a9fe-51f1443b79b0',
    image: 'https://avatars.dicebear.com/api/miniavs/Wallace Macejkovic.svg',
    country: 'Latvia',
    Title: 'Major Lazer',
    Year: '1994–2004',
    Rated: 'TV-PG',
    Released: '22 Sep 1994',
    Runtime: '22 min',
    Genre: 'Comedy, Romance',
    Director: 'N/A',
    Writer: 'David Crane, Marta Kauffman',
    Actors: 'Jennifer Aniston, Courteney Cox, Lisa Kudrow',
    Plot: 'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.',
    Language: 'English, Spanish, Italian, French, Dutch, Hebrew',
    Country: 'United States',
    Awards: 'Won 6 Primetime Emmys. 77 wins & 220 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.8',
    imdbVotes: '928,567',
    imdbID: 'tt0108778',
    Type: 'series',
    totalSeasons: '10',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.8/10' }],
    rating: 5,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/docker-icon.svg',
    liveMusicStreamID: 'SrNQS8J67zc',
  },
  {
    id: '5fd716ff-04f6-4449-9562-08ad2248b21f',
    description: 'Digitized tertiary definition',
    title: 'Brad Zboncak',
    since: '2023-08-20T13:35:00',
    till: '2023-08-20T14:35:00',
    trackId: 'e7f834ae-65e6-4a6d-a9fe-51f1443b79b0',
    image: 'https://avatars.dicebear.com/api/miniavs/Elisa Lehner.svg',
    country: 'Norfolk Island',
    Title: 'MORTEN',
    Year: '1989–',
    Rated: 'TV-PG',
    Released: '17 Dec 1989',
    Runtime: '22 min',
    Genre: 'Animation, Short, Comedy',
    Director: 'N/A',
    Writer: 'James L. Brooks, Matt Groening, Sam Simon',
    Actors: 'Dan Castellaneta, Nancy Cartwright, Harry Shearer',
    Plot: 'The satiric adventures of a working-class family in the misfit city of Springfield.',
    Language:
      'English, Spanish, Albanian, French, Japanese, German, Russian, Hindi, Swahili, Italian, Swedish, Turkish, Cantonese, Mandarin, Hebrew, Arabic, Klingon, Bengali, Czech, Chinese',
    Country: 'United States',
    Awards: 'Won 35 Primetime Emmys. 178 wins & 338 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.6',
    imdbVotes: '387,851',
    imdbID: 'tt0096697',
    Type: 'series',
    totalSeasons: '34',
    Response: 'True',
    Ratings: [
      { Source: 'Internet Movie Database', Value: '8.6/10' },
      { Source: 'Rotten Tomatoes', Value: '89%' },
    ],
    rating: 1,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/docker-icon.svg',
    liveMusicStreamID: 'jo-1EUxMmxc',
  },
  {
    id: '2b9a8a46-78c0-4c15-8a71-e9bd809d6371',
    description: 'Cloned well-modulated standardization',
    title: 'Jim Wisozk',
    since: '2023-08-20T14:35:00',
    till: '2023-08-20T15:45:00',
    trackId: 'e7f834ae-65e6-4a6d-a9fe-51f1443b79b0',
    image: 'https://avatars.dicebear.com/api/miniavs/Charlotte Trantow.svg',
    country: 'Suriname',
    Title: 'Galantis',
    Year: '1993–2018',
    Rated: 'TV-14',
    Released: '10 Sep 1993',
    Runtime: '45 min',
    Genre: 'Crime, Drama, Mystery',
    Director: 'N/A',
    Writer: 'Chris Carter',
    Actors: 'David Duchovny, Gillian Anderson, Mitch Pileggi',
    Plot: 'Two F.B.I. Agents, Fox Mulder the believer and Dana Scully the skeptic, investigate the strange and unexplained, while hidden forces work to impede their efforts.',
    Language: 'English',
    Country: 'United States',
    Awards: 'Won 16 Primetime Emmys. 100 wins & 217 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.6',
    imdbVotes: '213,819',
    imdbID: 'tt0106179',
    Type: 'series',
    totalSeasons: '11',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.6/10' }],
    rating: 2,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/docker-icon.svg',
    liveMusicStreamID: 'qqt6YxAZoOc',
  },
  {
    id: '784957b1-62a5-48d7-a5c5-870ee810af80',
    description: 'Implemented neutral moderator',
    title: 'Kirk Rowe',
    since: '2023-08-20T15:45:00',
    till: '2023-08-20T16:00:00',
    trackId: 'e7f834ae-65e6-4a6d-a9fe-51f1443b79b0',
    image: 'https://avatars.dicebear.com/api/miniavs/Johnny Thompson.svg',
    country: 'United States',
    Title: 'Clean Bandit',
    Year: '2000–2006',
    Rated: 'TV-PG',
    Released: '09 Jan 2000',
    Runtime: '22 min',
    Genre: 'Comedy, Family',
    Director: 'N/A',
    Writer: 'Linwood Boomer, Michael Glouberman, Gary Murphy',
    Actors: 'Frankie Muniz, Bryan Cranston, Justin Berfield',
    Plot: 'A gifted young teen tries to survive life with his dimwitted, dysfunctional family.',
    Language: 'English, Latin, Spanish, Italian, French, Chinese',
    Country: 'United States',
    Awards: 'Won 7 Primetime Emmys. 46 wins & 118 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.1',
    imdbVotes: '125,408',
    imdbID: 'tt0212671',
    Type: 'series',
    totalSeasons: '7',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.1/10' }],
    rating: 5,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/docker-icon.svg',
    liveMusicStreamID: 'rtmFCcjEgEw',
  },
  {
    id: '9709b277-8789-4471-9b87-bd414f26e63f',
    description: 'Reactive value-added archive',
    title: 'Mandy Nienow',
    since: '2023-08-20T10:00:00',
    till: '2023-08-20T11:00:00',
    trackId: 'd0fae027-2199-4442-937c-56ad4fa5ed87',
    image: 'https://avatars.dicebear.com/api/miniavs/Ora Schmitt.svg',
    country: 'Tonga',
    Title: ' Meduza',
    Year: '2021–',
    Rated: 'TV-MA',
    Released: '24 Dec 2021',
    Runtime: 'N/A',
    Genre: 'Adventure, Drama, Mystery',
    Director: 'N/A',
    Writer: 'N/A',
    Actors: 'Bae Doona, Gong Yoo, Joon Lee',
    Plot: 'During a perilous 24-hour mission on the moon, space explorers try to retrieve samples from an abandoned research facility steeped in classified secrets.',
    Language: 'Korean',
    Country: 'South Korea',
    Awards: 'N/A',
    Metascore: 'N/A',
    imdbRating: '6.9',
    imdbVotes: '13,008',
    imdbID: 'tt11570202',
    Type: 'series',
    totalSeasons: '1',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '6.9/10' }],
    rating: 4,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/640px-Angular_full_color_logo.svg.png',
    liveMusicStreamID: 'jo-1EUxMmxc',
  },
  {
    id: '4fd9df86-7bb0-48f8-9236-27df55ee9624',
    description: 'Assimilated dedicated array',
    title: 'Katrina Stiedemann',
    since: '2023-08-20T11:00:00',
    till: '2023-08-20T12:00:00',
    trackId: 'd0fae027-2199-4442-937c-56ad4fa5ed87',
    image: 'https://avatars.dicebear.com/api/miniavs/Lamar Kub.svg',
    country: 'Dominican Republic',
    Title: 'DJ Snake',
    Year: '2003–2015',
    Rated: 'TV-14',
    Released: '22 Sep 2003',
    Runtime: '22 min',
    Genre: 'Comedy, Romance',
    Director: 'N/A',
    Writer: 'Lee Aronsohn, Chuck Lorre',
    Actors: 'Jon Cryer, Ashton Kutcher, Angus T. Jones',
    Plot: "A hedonistic jingle writer's free-wheeling life comes to an abrupt halt when his brother and 10-year-old nephew move into his beach-front house.",
    Language: 'English',
    Country: 'United States',
    Awards: 'Won 9 Primetime Emmys. 30 wins & 72 nominations total',
    Metascore: 'N/A',
    imdbRating: '7.0',
    imdbVotes: '253,658',
    imdbID: 'tt0369179',
    Type: 'series',
    totalSeasons: '12',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '7.0/10' }],
    rating: 5,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/640px-Angular_full_color_logo.svg.png',
    liveMusicStreamID: 'c8hvW14VdkY',
  },
  {
    id: 'b400f464-de19-4bf4-8d5c-d7194b9bdffa',
    description: 'Stand-alone clear-thinking website',
    title: 'Omar Kutch',
    since: '2023-08-20T12:00:00',
    till: '2023-08-20T13:00:00',
    trackId: 'd0fae027-2199-4442-937c-56ad4fa5ed87',
    image: 'https://avatars.dicebear.com/api/miniavs/Ira Reilly.svg',
    country: 'Bangladesh',
    Title: ' Meduza',
    Year: '2021–',
    Rated: 'TV-MA',
    Released: '24 Dec 2021',
    Runtime: 'N/A',
    Genre: 'Adventure, Drama, Mystery',
    Director: 'N/A',
    Writer: 'N/A',
    Actors: 'Bae Doona, Gong Yoo, Joon Lee',
    Plot: 'During a perilous 24-hour mission on the moon, space explorers try to retrieve samples from an abandoned research facility steeped in classified secrets.',
    Language: 'Korean',
    Country: 'South Korea',
    Awards: 'N/A',
    Metascore: 'N/A',
    imdbRating: '6.9',
    imdbVotes: '13,008',
    imdbID: 'tt11570202',
    Type: 'series',
    totalSeasons: '1',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '6.9/10' }],
    rating: 5,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/640px-Angular_full_color_logo.svg.png',
    liveMusicStreamID: 'jo-1EUxMmxc',
  },
  {
    id: 'e1232dd1-eaf8-420d-9f9c-75cf42047ea2',
    description: 'Optional impactful leverage',
    title: 'Robin Hyatt',
    since: '2023-08-20T13:00:00',
    till: '2023-08-20T14:00:00',
    trackId: 'd0fae027-2199-4442-937c-56ad4fa5ed87',
    image: 'https://avatars.dicebear.com/api/miniavs/Miss Emily Anderson.svg',
    country: 'Greece',
    Title: 'Disclosure',
    Year: '2021–',
    Rated: 'TV-MA',
    Released: '09 Dec 2021',
    Runtime: 'N/A',
    Genre: 'Comedy, Drama, Romance',
    Director: 'N/A',
    Writer: 'Michael Patrick King, Darren Star',
    Actors: 'Sarah Jessica Parker, Cynthia Nixon, Kristin Davis',
    Plot: 'The series will follow Carrie, Miranda and Charlotte as they navigate the journey from the complicated reality of life and friendship in their 30s to the even more complicated reality of life and friendship in their 50s.',
    Language: 'English',
    Country: 'United States',
    Awards: 'N/A',
    Metascore: 'N/A',
    imdbRating: '5.4',
    imdbVotes: '18,366',
    imdbID: 'tt13819960',
    Type: 'series',
    totalSeasons: '1',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '5.4/10' }],
    rating: 2,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/640px-Angular_full_color_logo.svg.png',
    liveMusicStreamID: 'rxlJRydqmk8',
  },
  {
    id: '475f3a52-4260-4de5-a5c8-d958df6def26',
    description: 'Persevering context-sensitive open system',
    title: 'Geoffrey Hackett V',
    since: '2023-08-20T14:00:00',
    till: '2023-08-20T14:20:00',
    trackId: 'd0fae027-2199-4442-937c-56ad4fa5ed87',
    image: 'https://avatars.dicebear.com/api/miniavs/Daryl Steuber.svg',
    country: 'Cayman Islands',
    Title: 'Kygo',
    Year: '1990',
    Rated: 'R',
    Released: '08 Feb 1991',
    Runtime: '100 min',
    Genre: 'Action, Romance, Sci-Fi',
    Director: 'Kevin Tenney',
    Writer: 'Kevin Tenney',
    Actors: 'Robert Forster, Lance Edwards, Hilary Shepard',
    Plot: 'A doctor (Shepard) gets caught up in a war between two aliens (Edwards, Forster).',
    Language: 'English',
    Country: 'United States',
    Awards: 'N/A',
    Metascore: 'N/A',
    imdbRating: '5.3',
    imdbVotes: '567',
    imdbID: 'tt0100343',
    Type: 'movie',
    DVD: 'N/A',
    BoxOffice: 'N/A',
    Production: 'N/A',
    Website: 'N/A',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '5.3/10' }],
    rating: 4,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/640px-Angular_full_color_logo.svg.png',
    liveMusicStreamID: 'rtmFCcjEgEw',
  },
  {
    id: 'e8f8d455-b12d-41e9-809e-f0432b370638',
    description: 'Reactive dedicated help-desk',
    title: 'Pedro Hickle',
    since: '2023-08-20T14:20:00',
    till: '2023-08-20T15:00:00',
    trackId: 'd0fae027-2199-4442-937c-56ad4fa5ed87',
    image: 'https://avatars.dicebear.com/api/miniavs/Greg Hessel.svg',
    country: 'Bosnia and Herzegovina',
    Title: ' Skrillex',
    Year: '2014–',
    Rated: 'TV-PG',
    Released: '07 Oct 2014',
    Runtime: '43 min',
    Genre: 'Action, Adventure, Drama',
    Director: 'N/A',
    Writer: 'Greg Berlanti, Geoff Johns, Andrew Kreisberg',
    Actors: 'Grant Gustin, Candice Patton, Danielle Panabaker',
    Plot: "After being struck by lightning, Barry Allen wakes up from his coma to discover he's been given the power of super speed, becoming the Flash, fighting crime in Central City.",
    Language: 'English',
    Country: 'United States',
    Awards: 'Nominated for 1 Primetime Emmy. 29 wins & 90 nominations total',
    Metascore: 'N/A',
    imdbRating: '7.6',
    imdbVotes: '331,912',
    imdbID: 'tt3107288',
    Type: 'series',
    totalSeasons: '8',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '7.6/10' }],
    rating: 4,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/640px-Angular_full_color_logo.svg.png',
    liveMusicStreamID: 'qqt6YxAZoOc',
  },
  {
    id: 'a8386ccc-06c7-4959-b3f8-d3c945fefd64',
    description: 'Configurable holistic time-frame',
    title: 'Jesse Quitzon',
    since: '2023-08-20T15:00:00',
    till: '2023-08-20T16:00:00',
    trackId: 'd0fae027-2199-4442-937c-56ad4fa5ed87',
    image: 'https://avatars.dicebear.com/api/miniavs/Luis Kling.svg',
    country: 'Cook Islands',
    Title: 'MNEK',
    Year: '1998–2006',
    Rated: 'TV-14',
    Released: '23 Aug 1998',
    Runtime: '22 min',
    Genre: 'Comedy, Drama, Romance',
    Director: 'N/A',
    Writer: 'Mark Brazill, Bonnie Turner, Terry Turner',
    Actors: 'Topher Grace, Laura Prepon, Mila Kunis',
    Plot: 'A comedy revolving around a group of teenage friends, their mishaps, and their coming of age, set in 1970s Wisconsin.',
    Language: 'English',
    Country: 'United States',
    Awards: 'Won 1 Primetime Emmy. 15 wins & 77 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.0',
    imdbVotes: '163,020',
    imdbID: 'tt0165598',
    Type: 'series',
    totalSeasons: '8',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.0/10' }],
    rating: 2,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/640px-Angular_full_color_logo.svg.png',
    liveMusicStreamID: 'rxlJRydqmk8',
  },

  // New
  {
    id: '9709b277-8789-4471-9b87-bd414f26e63f3',
    description: 'Reactive value-added archive',
    title: 'John Doe',
    since: '2023-08-20T10:00:00',
    till: '2023-08-20T11:00:00',
    trackId: 'd0fae027-2199-4442-937c-56ad4fa5ed873',
    image: 'https://avatars.dicebear.com/api/miniavs/Ora Schmitt.svg',
    country: 'Tonga',
    Title: ' Meduza',
    Year: '2021–',
    Rated: 'TV-MA',
    Released: '24 Dec 2021',
    Runtime: 'N/A',
    Genre: 'Adventure, Drama, Mystery',
    Director: 'N/A',
    Writer: 'N/A',
    Actors: 'Bae Doona, Gong Yoo, Joon Lee',
    Plot: 'During a perilous 24-hour mission on the moon, space explorers try to retrieve samples from an abandoned research facility steeped in classified secrets.',
    Language: 'Korean',
    Country: 'South Korea',
    Awards: 'N/A',
    Metascore: 'N/A',
    imdbRating: '6.9',
    imdbVotes: '13,008',
    imdbID: 'tt11570202',
    Type: 'series',
    totalSeasons: '1',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '6.9/10' }],
    rating: 4,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Deno_2021.svg',
    liveMusicStreamID: 'jo-1EUxMmxc',
  },
  {
    id: '4fd9df86-7bb0-48f8-9236-27df55ee96243',
    description: 'Assimilated dedicated array',
    title: 'Katrina Stiedemann',
    since: '2023-08-20T11:00:00',
    till: '2023-08-20T12:00:00',
    trackId: 'd0fae027-2199-4442-937c-56ad4fa5ed873',
    image: 'https://avatars.dicebear.com/api/miniavs/Lamar Kub.svg',
    country: 'Dominican Republic',
    Title: 'DJ Snake',
    Year: '2003–2015',
    Rated: 'TV-14',
    Released: '22 Sep 2003',
    Runtime: '22 min',
    Genre: 'Comedy, Romance',
    Director: 'N/A',
    Writer: 'Lee Aronsohn, Chuck Lorre',
    Actors: 'Jon Cryer, Ashton Kutcher, Angus T. Jones',
    Plot: "A hedonistic jingle writer's free-wheeling life comes to an abrupt halt when his brother and 10-year-old nephew move into his beach-front house.",
    Language: 'English',
    Country: 'United States',
    Awards: 'Won 9 Primetime Emmys. 30 wins & 72 nominations total',
    Metascore: 'N/A',
    imdbRating: '7.0',
    imdbVotes: '253,658',
    imdbID: 'tt0369179',
    Type: 'series',
    totalSeasons: '12',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '7.0/10' }],
    rating: 5,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Deno_2021.svg',
    liveMusicStreamID: 'c8hvW14VdkY',
  },
  {
    id: 'b400f464-de19-4bf4-8d5c-d7194b9bdffa3',
    description: 'Stand-alone clear-thinking website',
    title: 'Omar Kutch',
    since: '2023-08-20T12:00:00',
    till: '2023-08-20T13:00:00',
    trackId: 'd0fae027-2199-4442-937c-56ad4fa5ed873',
    image: 'https://avatars.dicebear.com/api/miniavs/Ira Reilly.svg',
    country: 'Bangladesh',
    Title: ' Meduza',
    Year: '2021–',
    Rated: 'TV-MA',
    Released: '24 Dec 2021',
    Runtime: 'N/A',
    Genre: 'Adventure, Drama, Mystery',
    Director: 'N/A',
    Writer: 'N/A',
    Actors: 'Bae Doona, Gong Yoo, Joon Lee',
    Plot: 'During a perilous 24-hour mission on the moon, space explorers try to retrieve samples from an abandoned research facility steeped in classified secrets.',
    Language: 'Korean',
    Country: 'South Korea',
    Awards: 'N/A',
    Metascore: 'N/A',
    imdbRating: '6.9',
    imdbVotes: '13,008',
    imdbID: 'tt11570202',
    Type: 'series',
    totalSeasons: '1',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '6.9/10' }],
    rating: 5,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Deno_2021.svg',
    liveMusicStreamID: 'jo-1EUxMmxc',
  },
  {
    id: 'e1232dd1-eaf8-420d-9f9c-75cf42047ea23',
    description: 'Optional impactful leverage',
    title: 'Robin Hyatt',
    since: '2023-08-20T13:00:00',
    till: '2023-08-20T14:00:00',
    trackId: 'd0fae027-2199-4442-937c-56ad4fa5ed873',
    image: 'https://avatars.dicebear.com/api/miniavs/Miss Emily Anderson.svg',
    country: 'Greece',
    Title: 'Disclosure',
    Year: '2021–',
    Rated: 'TV-MA',
    Released: '09 Dec 2021',
    Runtime: 'N/A',
    Genre: 'Comedy, Drama, Romance',
    Director: 'N/A',
    Writer: 'Michael Patrick King, Darren Star',
    Actors: 'Sarah Jessica Parker, Cynthia Nixon, Kristin Davis',
    Plot: 'The series will follow Carrie, Miranda and Charlotte as they navigate the journey from the complicated reality of life and friendship in their 30s to the even more complicated reality of life and friendship in their 50s.',
    Language: 'English',
    Country: 'United States',
    Awards: 'N/A',
    Metascore: 'N/A',
    imdbRating: '5.4',
    imdbVotes: '18,366',
    imdbID: 'tt13819960',
    Type: 'series',
    totalSeasons: '1',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '5.4/10' }],
    rating: 2,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Deno_2021.svg',
    liveMusicStreamID: 'rxlJRydqmk8',
  },
  {
    id: '475f3a52-4260-4de5-a5c8-d958df6def263',
    description: 'Persevering context-sensitive open system',
    title: 'Geoffrey Hackett V',
    since: '2023-08-20T14:00:00',
    till: '2023-08-20T14:20:00',
    trackId: 'd0fae027-2199-4442-937c-56ad4fa5ed873',
    image: 'https://avatars.dicebear.com/api/miniavs/Daryl Steuber.svg',
    country: 'Cayman Islands',
    Title: 'Kygo',
    Year: '1990',
    Rated: 'R',
    Released: '08 Feb 1991',
    Runtime: '100 min',
    Genre: 'Action, Romance, Sci-Fi',
    Director: 'Kevin Tenney',
    Writer: 'Kevin Tenney',
    Actors: 'Robert Forster, Lance Edwards, Hilary Shepard',
    Plot: 'A doctor (Shepard) gets caught up in a war between two aliens (Edwards, Forster).',
    Language: 'English',
    Country: 'United States',
    Awards: 'N/A',
    Metascore: 'N/A',
    imdbRating: '5.3',
    imdbVotes: '567',
    imdbID: 'tt0100343',
    Type: 'movie',
    DVD: 'N/A',
    BoxOffice: 'N/A',
    Production: 'N/A',
    Website: 'N/A',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '5.3/10' }],
    rating: 4,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Deno_2021.svg',
    liveMusicStreamID: 'rtmFCcjEgEw',
  },
  {
    id: 'e8f8d455-b12d-41e9-809e-f0432b3706383',
    description: 'Reactive dedicated help-desk',
    title: 'Pedro Hickle',
    since: '2023-08-20T14:20:00',
    till: '2023-08-20T15:00:00',
    trackId: 'd0fae027-2199-4442-937c-56ad4fa5ed873',
    image: 'https://avatars.dicebear.com/api/miniavs/Greg Hessel.svg',
    country: 'Bosnia and Herzegovina',
    Title: ' Skrillex',
    Year: '2014–',
    Rated: 'TV-PG',
    Released: '07 Oct 2014',
    Runtime: '43 min',
    Genre: 'Action, Adventure, Drama',
    Director: 'N/A',
    Writer: 'Greg Berlanti, Geoff Johns, Andrew Kreisberg',
    Actors: 'Grant Gustin, Candice Patton, Danielle Panabaker',
    Plot: "After being struck by lightning, Barry Allen wakes up from his coma to discover he's been given the power of super speed, becoming the Flash, fighting crime in Central City.",
    Language: 'English',
    Country: 'United States',
    Awards: 'Nominated for 1 Primetime Emmy. 29 wins & 90 nominations total',
    Metascore: 'N/A',
    imdbRating: '7.6',
    imdbVotes: '331,912',
    imdbID: 'tt3107288',
    Type: 'series',
    totalSeasons: '8',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '7.6/10' }],
    rating: 4,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Deno_2021.svg',
    liveMusicStreamID: 'qqt6YxAZoOc',
  },
  {
    id: 'a8386ccc-06c7-4959-b3f8-d3c945fefd643',
    description: 'Configurable holistic time-frame',
    title: 'Jesse Quitzon',
    since: '2023-08-20T15:00:00',
    till: '2023-08-20T16:00:00',
    trackId: 'd0fae027-2199-4442-937c-56ad4fa5ed873',
    image: 'https://avatars.dicebear.com/api/miniavs/Luis Kling.svg',
    country: 'Cook Islands',
    Title: 'MNEK',
    Year: '1998–2006',
    Rated: 'TV-14',
    Released: '23 Aug 1998',
    Runtime: '22 min',
    Genre: 'Comedy, Drama, Romance',
    Director: 'N/A',
    Writer: 'Mark Brazill, Bonnie Turner, Terry Turner',
    Actors: 'Topher Grace, Laura Prepon, Mila Kunis',
    Plot: 'A comedy revolving around a group of teenage friends, their mishaps, and their coming of age, set in 1970s Wisconsin.',
    Language: 'English',
    Country: 'United States',
    Awards: 'Won 1 Primetime Emmy. 15 wins & 77 nominations total',
    Metascore: 'N/A',
    imdbRating: '8.0',
    imdbVotes: '163,020',
    imdbID: 'tt0165598',
    Type: 'series',
    totalSeasons: '8',
    Response: 'True',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.0/10' }],
    rating: 2,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Deno_2021.svg',
    liveMusicStreamID: 'rxlJRydqmk8',
  },
]

const epgChannels = [
  {
    id: '368358e0-25ca-4ec9-90c6-db659968f8a2',
    type: 'channel',
    title: 'Main Hall',
    country: 'USA',
    provider: 7427,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png',
    year: 2002,
  },
  {
    id: '1c32397f-fb76-45f5-aa05-592ad4118e6d',
    type: 'channel',
    title: 'DevTrends',
    country: 'USA',
    provider: 9749,
    logo: 'https://github.com/aarjithn/frontend-logos/blob/master/app/images/logos/1ec9cb73f2aac4884b7014ca4a7d8789.png?raw=true',
    year: 2002,
  },
  {
    id: 'fb042781-4228-4080-95b9-229e3bd53b6a',
    type: 'channel',
    title: 'Inspire Dev',
    country: 'USA',
    provider: 2764,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/nodejs-icon.svg',
    year: 2002,
  },
  {
    id: 'be37b383-18b2-4ab5-8973-263a38add4fc',
    type: 'channel',
    title: 'Marketing',
    country: 'USA',
    provider: 5380,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/nestjs.svg',
    year: 2002,
  },
  {
    id: 'e7f834ae-65e6-4a6d-a9fe-51f1443b79b0',
    type: 'channel',
    title: 'Management',
    country: 'USA',
    provider: 5380,
    logo: 'https://raw.githubusercontent.com/gilbarbara/logos/80c549990a0f513dcbaf3c9eab6a1a620df76088/logos/docker-icon.svg',
    year: 2002,
  },
  {
    id: 'd0fae027-2199-4442-937c-56ad4fa5ed87',
    type: 'channel',
    title: 'Machine Learning',
    country: 'USA',
    provider: 5066,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/640px-Angular_full_color_logo.svg.png',
    year: 2002,
  },
  {
    id: 'd0fae027-2199-4442-937c-56ad4fa5ed873',
    type: 'channel',
    title: 'Deno',
    country: 'USA',
    provider: 5066,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Deno_2021.svg',
    year: 2002,
  },
]

// const fetchResources = async () => {
//   const channels = epgChannels

//   const epg = epgs.filter(() => Math.random() < 0.8)
//   return { channels, epg }
// }

export function ChannelItem({ setting }) {
  const { isVerticalMode, channel } = setting
  const { position, logo } = channel

  return (
    <ChannelBox
      data-testid="sidebar-item"
      isVerticalMode={isVerticalMode}
      style={{
        border: '1px solid transparent',
        // borderBottomColor: '#7180961a',
        // borderRightColor: '#7180961a',
        borderBottomColor: '#ddd',
        borderRightColor: '#ddd',
        backgroundColor: '#fff',
      }}
      {...position}
    >
      <ChannelLogo src={logo} alt="Logo" />
    </ChannelBox>
  )
}

// ----- Please uncomment the following lines to see the custom components -----
// Import components
// import {
// CustomTimeline,
// ChannelItem,
// Line,
// LiveTime,
// Program,
// } from "./components";

function App() {
  const startDate = '2023-08-20T10:00:00'
  const endDate = '2023-08-20T16:00:00'

  const isMobileMax = useMediaQuery({
    query: '(max-width: 800px)',
  })
  const [channels, setChannels] = useState([])
  const [epg, setEpg] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // const [isSnap, setIsSnap] = useState(false)

  const channelsData = useMemo(() => channels, [channels])
  const epgData = useMemo(() => epg, [epg])
  // console.log('isSnap', isSnap)
  // const snap = isSnap ? { snap: { x: 91.5 } } : {}
  const { getEpgProps, getLayoutProps } = useEpg({
    channels: channelsData,
    epg: epgData,
    dayWidth: 2200,
    startDate,
    endDate,
    isVerticalMode: isMobileMax,
    sidebarWidth: isMobileMax ? 100 : 100,
    itemHeight: isMobileMax ? 300 : 90,
    channelMapKey: 'id',
    programChannelMapKey: 'trackId',
    isBaseTimeFormat: true,
    isResize: true,
    // ...snap,
    overlap: {
      enabled: true,
      mode: 'stack',
      layerOverlapLevel: 0.4,
    },
    dnd: { enabled: true, mode: 'multi-rows' },
    grid: {
      enabled: true,
      onGridItemClick: (props) => alert(JSON.stringify(props)),
      hoverHighlight: true,
    },
    // theme,
  })

  const handleFetchResources = useCallback(async () => {
    setIsLoading(true)
    // const { epg, channels } = await fetchResources()

    setEpg(epgs)
    setChannels(epgChannels)
    setIsLoading(false)
  }, [])

  // const handleSetSnap = useCallback(() => setIsSnap((prev) => !prev), [])

  useEffect(() => {
    handleFetchResources()
  }, [])

  // const { isLoading, getEpgProps, getLayoutProps } = useApp()

  return (
    <div className="p-0">
      <h4 className="text-secondary text-start py-3 ps-4 ms-2">
        Production and publishing schedule
      </h4>
      <Row className="px-5">
        <OverlayTrigger
          trigger="click"
          key="bottom"
          placement="bottom"
          overlay={
            <Popover id="popover-positioned-bottom">
              <Popover.Body>
                <Row className="text-center fs-6 fw-bold">
                  <Col />
                  <Col>Script</Col>
                  <Col>Filming</Col>
                  <Col>Editing</Col>
                </Row>
                <hr />
                <Row className="text-center fs-6">
                  <Col>Video 1</Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                </Row>
                <Row className="text-center pt-3 fs-6">
                  <Col>Video 2</Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                </Row>
                <Row className="text-center pt-3 fs-6">
                  <Col>Video 3</Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                </Row>
                <Row className="text-center pt-3 fs-6">
                  <Col>Video 4</Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                </Row>
              </Popover.Body>
            </Popover>
          }
        >
          <Button
            variant="secondary"
            className="p-0"
            style={{ width: '49.85%', borderRadius: '0' }}
          >
            <div className="bg-secondary text-light h4 py-0">Q1</div>
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          trigger="click"
          key="bottom"
          placement="bottom"
          overlay={
            <Popover id="popover-positioned-bottom">
              <Popover.Body>
                <Row className="text-center fs-6 fw-bold">
                  <Col />
                  <Col>Script</Col>
                  <Col>Filming</Col>
                  <Col>Editing</Col>
                </Row>
                <hr />
                <Row className="text-center fs-6">
                  <Col>Video 1</Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                </Row>
                <Row className="text-center pt-3 fs-6">
                  <Col>Video 2</Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                </Row>
                <Row className="text-center pt-3 fs-6">
                  <Col>Video 3</Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                </Row>
                <Row className="text-center pt-3 fs-6">
                  <Col>Video 4</Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid checked />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Control.Feedback type="valid" />
                    </Form.Check>
                  </Col>
                </Row>
              </Popover.Body>
            </Popover>
          }
        >
          <Button
            variant="secondary ms-auto"
            className="p-0"
            style={{ width: '49.85%', borderRadius: '0' }}
          >
            <div className="bg-secondary text-light h4 py-0">Q2</div>
          </Button>
        </OverlayTrigger>
      </Row>
      <Row className="px-5">
        <Col className="bg-user-marmot text-dark h6 py-0 fw-bold">January</Col>
        <Col className="bg-user-marmot text-dark h6 py-0 ms-1 fw-bold">
          February
        </Col>
        <Col className="bg-user-marmot text-dark h6 py-0 ms-1 fw-bold">
          March
        </Col>
        <Col className="bg-user-marmot text-dark h6 py-0 ms-1 fw-bold">
          April
        </Col>
        <Col className="bg-user-marmot text-dark h6 py-0 ms-1 fw-bold">May</Col>
        <Col className="bg-user-marmot text-dark h6 py-0 ms-1 fw-bold">
          June
        </Col>
      </Row>
      <Row>
        <div style={{ width: '3.5%' }}>
          <div
            className="bg-light2 text-light h5 upright"
            style={{ height: '36%' }}
          >
            Topic 1
          </div>
          <div
            className="bg-light3 text-light h5 upright"
            style={{ height: '36%' }}
          >
            Topic 2
          </div>
        </div>
        {/* <div style={{ margin: 10, display: 'flex' }}>
        <a id="downloadAnchor" style={{ display: 'none' }} />

        <button
          onClick={() => {
            const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(getLayoutData(getLayoutProps().programs))
            )}`
            const dlAnchorElem = document.getElementById('downloadAnchor')
            dlAnchorElem?.setAttribute('href', dataStr)
            dlAnchorElem?.setAttribute('download', 'planbyLayoutDemoData.json')
            dlAnchorElem?.click()
          }}
        >
          Download Layout Data
        </button>
        <div>
          <label
            id="snap"
            style={{ marginLeft: 15, display: 'flex', alignItems: 'center' }}
          >
            <span>DnD snap X</span>
            <input type="checkbox" id="snap" onChange={() => setSnap()} />{' '}
          </label>
        </div>
      </div> */}
        <div style={{ width: '96.5%' }}>
          <div
            style={{
              height: '600px',
              width: '100%',
            }}
          >
            <Epg isLoading={isLoading} {...getEpgProps()}>
              <Layout
                {...getLayoutProps()}
                // ----- Please uncomment the following lines to see the custom components -----
                // renderLine={(props) => <Line {...props} />}
                // renderCurrentTime={(props) => <LiveTime {...props} />}
                // renderTimeline={(props) => <CustomTimeline {...props} />}
                // renderProgram={({ program, ...rest }) => (
                //   <Program
                //     key={`${program.data.channelUuid}-${program.data.id}`}
                //     program={program}
                //     {...rest}
                //   />
                // )}
                renderChannel={({ channel, ...rest }) => (
                  <ChannelItem
                    style={{ backgroundColor: '#fff' }}
                    setting={{
                      key: channel.uuid,
                      channel,
                      ...rest,
                    }}
                  />
                )}
              />
            </Epg>
          </div>
        </div>
      </Row>
    </div>
  )
}

ChannelItem.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default App

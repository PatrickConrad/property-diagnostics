import { IProperty, PropertyImage } from "../types/dataTypes";

export const mockProperties: IProperty[] = [
    {
        id: '0',
        address: '11289 Ferndale Drive',
        city: 'Annapolis',
        state: 'MD',
        zip: '21406',
        lastInspectionDate: new Date(2012, 1, 5),
        scheduledInspectoinDate: new Date(2022, 10, 12),
        owners: ['4', '2'],
        group: 'test',
        images: {
            mainImage: '/building.jpg',
            propertyImages: [
                {
                    id: '0',
                    src: '/building1Sized.jpg',
                    caption: 'Main Image',
                    location: 'mainImage',
                    date: new Date(2010, 3, 10) 
                },
                {
                    id: '1',
                    src: '/pool2Sized.jpg',
                    caption: 'Caption',
                    location: 'grounds',
                    date: new Date(2008, 4, 15)
                },
                {
                    id: '2',
                    src: '/flooringSized.jpg',
                    caption: 'caption',
                    location: 'envelope',
                    date: new Date(2016, 1, 12)
                },
                {
                    id: '3',
                    src: '/breakerBoxSized.jpg',
                    caption: '',
                    location: 'plumbing',
                    date: new Date(2013, 0, 21)
                }
            ]
        },
        notes: [
            'Work on Property',
            'build this',
            'Invest in this area'
        ],
        projections: {
            grounds: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            envelope: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            interior: [
                {
                    year: 2022,
                    initial: 10000,
                },
            ],
            mechanical: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            plumbing: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            electrical: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ]
        }
    },
    {
        id: '1',
        address: '2984 Stork Place #1A',
        city: 'Alexandria',
        state: 'VA',
        zip: '24845',
        group: 'Test2',
        lastInspectionDate: new Date(2017,9, 6),
        scheduledInspectoinDate: new Date(2022, 10, 3),
        owners: ['1', '2'],
        images: {
            mainImage: '/building2.jpg',
            propertyImages: [
                {
                    id: '0',
                    src: '/building2Sized.jpg',
                    caption: 'Main Image',
                    location: 'mainImage',
                    date: new Date(2012, 1, 5) 
                },
                {
                    id: '1',
                    src: '/poolSized.jpg',
                    caption: 'Caption',
                    location: 'grounds',
                    date:  new Date(2017,9, 6),
                },
                {
                    id: '2',
                    src: '/fenceSized.jpg',
                    caption: 'caption',
                    location: 'envelope',
                    date:  new Date(2017,9, 6),
                },
                {
                    id: '3',
                    src: '/breakerBoxSized.jpg',
                    caption: 'caption',
                    location: 'electrical',
                    date:  new Date(2017,9, 6),
                }
            ],
        },
        notes: [
            'Work on Property',
            'build this',
            'Invest in this area'
        ],
        projections: {
            grounds: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            envelope: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            interior: [
                {
                    year: 2022,
                    initial: 10000,
                },
            ],
            mechanical: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            plumbing: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            electrical: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ]
        }
    },
    {
        id: '2',
        address: '135 Trentondale Ct.',
        city: 'Alexandria',
        state: 'VA',
        zip: '24845',
        group: 'Test2',
        lastInspectionDate: new Date(2017,9, 6),
        scheduledInspectoinDate: new Date(2022, 10, 3),
        owners: ['1', '2'],
        images: {
            mainImage: '/building2.jpg',
            propertyImages: [
                {
                    id: '0',
                    src: '/building2Sized.jpg',
                    caption: 'Main Image',
                    location: 'mainImage',
                    date: new Date(2012, 1, 5) 
                },
                {
                    id: '1',
                    src: '/poolSized.jpg',
                    caption: 'Caption',
                    location: 'grounds',
                    date:  new Date(2017,9, 6),
                },
                {
                    id: '2',
                    src: '/fenceSized.jpg',
                    caption: 'caption',
                    location: 'envelope',
                    date:  new Date(2017,9, 6),
                },
                {
                    id: '3',
                    src: '/breakerBoxSized.jpg',
                    caption: 'caption',
                    location: 'electrical',
                    date:  new Date(2017,9, 6),
                },
                {
                    id: '4',
                    src: '/poolSized.jpg',
                    caption: 'Caption',
                    location: 'grounds',
                    date:  new Date(2017,9, 6),
                },
                {
                    id: '5',
                    src: '/fenceSized.jpg',
                    caption: 'caption',
                    location: 'envelope',
                    date:  new Date(2017,9, 6),
                },
                {
                    id: '6',
                    src: '/breakerBoxSized.jpg',
                    caption: 'caption',
                    location: 'electrical',
                    date:  new Date(2017,9, 6),
                }
            ],
        },
        notes: [
            'Work on Property',
            'build this',
            'Invest in this area'
        ],
        projections: {
            grounds: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            envelope: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            interior: [
                {
                    year: 2022,
                    initial: 10000,
                },
            ],
            mechanical: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            plumbing: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            electrical: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ]
        }
    },
    {
        id: '3',
        address: '76 Hern Blvd.',
        city: 'Alexandria',
        state: 'VA',
        zip: '24845',
        group: 'Test8',
        lastInspectionDate: new Date(2017,9, 6),
        scheduledInspectoinDate: new Date(2022, 10, 3),
        owners: ['6', '3'],
        images: {
            mainImage: '/building2.jpg',
            propertyImages: [
                {
                    id: '0',
                    src: '/building2Sized.jpg',
                    caption: 'Main Image',
                    location: 'mainImage',
                    date: new Date(2012, 1, 5) 
                },
                {
                    id: '1',
                    src: '/poolSized.jpg',
                    caption: 'Caption',
                    location: 'grounds',
                    date:  new Date(2017,9, 6),
                },
                {
                    id: '2',
                    src: '/fenceSized.jpg',
                    caption: 'caption',
                    location: 'envelope',
                    date:  new Date(2017,9, 6),
                },
                {
                    id: '3',
                    src: '/breakerBoxSized.jpg',
                    caption: 'caption',
                    location: 'electrical',
                    date:  new Date(2017,9, 6),
                }
            ],
        },
        notes: [
            'Work on Property',
            'build this',
            'Invest in this area'
        ],
        projections: {
            grounds: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            envelope: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            interior: [
                {
                    year: 2022,
                    initial: 10000,
                },
            ],
            mechanical: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            plumbing: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            electrical: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ]
        }
    },
    {
        id: '4',
        address: '55 Colesmith Ct.',
        city: 'Alexandria',
        state: 'VA',
        zip: '24845',
        group: 'Test4',
        lastInspectionDate: new Date(2017,9, 6),
        scheduledInspectoinDate: new Date(2022, 10, 3),
        owners: ['3', '8'],
        images: {
            mainImage: '/building2.jpg',
            propertyImages: [
                {
                    id: '0',
                    src: '/building2Sized.jpg',
                    caption: 'Main Image',
                    location: 'mainImage',
                    date: new Date(2012, 1, 5) 
                },
                {
                    id: '1',
                    src: '/poolSized.jpg',
                    caption: 'Caption',
                    location: 'grounds',
                    date:  new Date(2017,9, 6),
                },
                {
                    id: '2',
                    src: '/fenceSized.jpg',
                    caption: 'caption',
                    location: 'envelope',
                    date:  new Date(2017,9, 6),
                },
                {
                    id: '3',
                    src: '/breakerBoxSized.jpg',
                    caption: 'caption',
                    location: 'electrical',
                    date:  new Date(2017,9, 6),
                }
            ],
        },
        notes: [
            'Work on Property',
            'build this',
            'Invest in this area'
        ],
        projections: {
            grounds: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            envelope: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            interior: [
                {
                    year: 2022,
                    initial: 10000,
                },
            ],
            mechanical: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            plumbing: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            electrical: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ]
        }
    },
    {
        id: '5',
        address: '144 Fallwood Park',
        city: 'Alexandria',
        state: 'VA',
        zip: '24845',
        group: 'Test5',
        lastInspectionDate: new Date(2017,9, 6),
        scheduledInspectoinDate: new Date(2022, 10, 3),
        owners: ['1', '5'],
        images: {
            mainImage: '/building2.jpg',
            propertyImages: [
                {
                    id: '0',
                    src: '/building2Sized.jpg',
                    caption: 'Main Image',
                    location: 'mainImage',
                    date: new Date(2012, 1, 5) 
                },
                {
                    id: '1',
                    src: '/poolSized.jpg',
                    caption: 'Caption',
                    location: 'grounds',
                    date:  new Date(2013,10, 4),
                },
                {
                    id: '2',
                    src: '/fenceSized.jpg',
                    caption: 'caption',
                    location: 'envelope',
                    date:  new Date(2021,11, 4),
                },
                {
                    id: '3',
                    src: '/breakerBoxSized.jpg',
                    caption: 'caption',
                    location: 'electrical',
                    date:  new Date(2014,7, 23),
                }
            ],
        },
        notes: [
            'Work on Property',
            'build this',
            'Invest in this area'
        ],
        projections: {
            grounds: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            envelope: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            interior: [
                {
                    year: 2022,
                    initial: 10000,
                },
            ],
            mechanical: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            plumbing: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            electrical: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ]
        }
    },
    {
        id: '6',
        address: '67 Pipe Dr.',
        city: 'Alexandria',
        state: 'VA',
        zip: '24845',
        group: 'Test6',
        lastInspectionDate: new Date(2017,9, 6),
        scheduledInspectoinDate: new Date(2022, 10, 3),
        owners: ['5', '7'],
        images: {
            mainImage: '/building2.jpg',
            propertyImages: [
                {
                    id: '0',
                    src: '/building2Sized.jpg',
                    caption: 'Main Image',
                    location: 'mainImage',
                    date: new Date(2012, 1, 5) 
                },
                {
                    id: '1',
                    src: '/poolSized.jpg',
                    caption: 'Caption',
                    location: 'grounds',
                    date:  new Date(2017,9, 6),
                },
                {
                    id: '2',
                    src: '/fenceSized.jpg',
                    caption: 'caption',
                    location: 'envelope',
                    date:  new Date(2017,9, 6),
                },
                {
                    id: '3',
                    src: '/breakerBoxSized.jpg',
                    caption: 'caption',
                    location: 'electrical',
                    date:  new Date(2017,9, 6),
                }
            ],
        },
        notes: [
            'Work on Property',
            'build this',
            'Invest in this area'
        ],
        projections: {
            grounds: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            envelope: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            interior: [
                {
                    year: 2022,
                    initial: 10000,
                },
            ],
            mechanical: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            plumbing: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ],
            electrical: [
                {
                    year: 2022,
                    initial: 10000,
                }
            ]
        }
    },
]
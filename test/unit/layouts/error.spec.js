import { mount, RouterLinkStub } from '@vue/test-utils';
import Chance from 'chance';
import generateNavigation from '../../helpers/navigationGenerator.js';
import error from '@/layouts/error.vue';

const chance = new Chance();

describe('error layout', () => {
  let wrapper, content, mockError, mockPath;

  const nuxtContentMock = {
    $content: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    fetch: jest.fn(),
  };


  beforeEach(() => {
    content = generateNavigation();
    nuxtContentMock.fetch.mockResolvedValue([content]);

    mockError = {
      statusCode: chance.integer({ min: 400, max: 599 }),
      message: chance.sentence(),
      error: new Error(chance.sentence(0))
    };

    mockPath = chance.string();

    wrapper = mount(error, {
      propsData: {
        error: mockError,
      },
      stubs: {
        NuxtLink: RouterLinkStub
      },
      mocks: {
        $nuxt: {
          $route: {
            path: mockPath
          }
        },
        $content: () => nuxtContentMock
      }
    });
  
  });

  it('renders the error status code', () => {
    expect(wrapper.text()).toContain(`${mockError.statusCode}`);
  });

  it('renders the error message', () => {
    expect(wrapper.text()).toContain(mockError.message);
  });

  it('renders a link to the home page', () => {
    expect(wrapper.findComponent({ ref: 'back-home' }).props('to')).toEqual('/');
  });

  it('renders a link to the contact page with the correct query parameters', () => {
    const expectedContactLink = `/contact?statusCode=${mockError.statusCode}&path=${encodeURIComponent(mockPath)}&detail=${encodeURIComponent(mockError.error.message)}`;
    expect(wrapper.findComponent({ ref: 'contact-link' }).props('to')).toEqual(expectedContactLink);
  });
});

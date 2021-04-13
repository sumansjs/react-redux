import * as courseActions from './courseActions';
import * as types from './actionTypes';
import { courses } from '../../../tools/mockData';
import thunk from 'redux-thunk';
import createMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';

// Test an async action
const middleware = [thunk];
const mockStore = createMockStore(middleware);

describe('Async Actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('Load Courses Thunk', () => {
    it('should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses', () => {
      fetchMock.mock('*', {
        body: courses,
        headers: { 'content-type': 'application/json' },
      });
    });

    const expectedAction = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_COURSES_SUCCESS, courses },
    ];

    const store = mockStore({ courses: [] });
    return store.dispatch(courseActions.loadCourses()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

describe('createCourseSuccess', () => {
  it('should createa a CREATE_COURSE_SUCCESS action', () => {
    // arrange
    const course = courses[0];

    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course,
    };

    // act
    const action = courseActions.createCourseSuccess(course);

    // assert
    expect(action).toEqual(expectedAction);
  });
});

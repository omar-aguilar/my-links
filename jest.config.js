module.exports = {
  verbose: false,
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  transform: {
    '\\.(?:t|j)sx?$': 'babel-jest',
  },
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    '\\.s?css$': 'identity-obj-proxy',
    '@/(.*)': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['\\.mock\\.tsx?$'],
  coveragePathIgnorePatterns: ['\\.mock\\.tsx?$'],
};

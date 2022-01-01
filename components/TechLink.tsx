import { Box } from './Box';

const TechLink = ({ children, name, href }) => {
  return (
    <Box href={href}>
      <div className='flex items-center space-x-3'>
        {children}
        <div className='font-medium text-gray-600 text-tiny'>{name}</div>
      </div>
    </Box>
  );
};

export default TechLink;

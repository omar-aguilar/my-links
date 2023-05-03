type TagListProps = {
  tags: string[];
};
const TagList = ({ tags }: TagListProps) => {
  return (
    <div className="flex row gap-1">
      {tags.map((tag) => {
        return (
          <div
            key={tag}
            className="flex items-center border border-gray-400 bg-gray-200 rounded px-1
              text-violet-700"
          >
            {tag}
          </div>
        );
      })}
    </div>
  );
};

export default TagList;

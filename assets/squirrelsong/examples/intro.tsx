type Props = {
  answer: string;
};

function Squirrelsong({
  answer,
}: Props) {
  return (
    <Stack gap="medium">
      <Heading level={1}>
        What did the squirrel say?
      </Heading>
      <Text variant="intro">
        {answer}
      </Text>
    </Stack>
  );
}

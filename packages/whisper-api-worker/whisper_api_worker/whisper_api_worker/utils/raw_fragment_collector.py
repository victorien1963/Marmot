from pathlib import Path
from logger import DefaultLogger
import settings


class RawFragmentCollector:
    def __init__(self, segments, video_file_path: Path, word_level_timestamps: bool):
        self.__segments = segments
        self.__video_file_path = video_file_path

        self.__word_level_timestamps = word_level_timestamps

        self.__raw_fragments = list()

    def execute(self):
        for segment in self.__segments:
            self.__collect_single_fragment(segment)

        return self.__raw_fragments

    def __collect_single_fragment(self, segment):
        DefaultLogger().info(f"Segment of {self.__video_file_path}: [{segment.start} -> {segment.end}] {segment.text}")

        if self.__word_level_timestamps:
            self.__collect_word_level_fragment(segment)

        else:
            self.__raw_fragments.append(dict(start=segment.start, end=segment.end, text=segment.text))

    def __collect_word_level_fragment(self, segment):
        for word in segment.words:
            self.__raw_fragments.append(dict(start=word.start, end=word.end, text=word.word))

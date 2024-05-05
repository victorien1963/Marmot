import settings
from typing import List, Dict


class RawFragmentMerger:
    def __init__(self, raw_fragments: List[Dict], delimiter: str, merge: bool, max_gap_between_sentences: float):
        self.__raw_fragments = raw_fragments
        self.__delimiter = delimiter
        self.__number_of_raw_fragments = len(raw_fragments)

        self.__merge = merge
        self.__max_gap_between_sentences = max_gap_between_sentences

        self.__merged_fragments = list()
        self.__single_merged_fragment = dict()

    def execute(self) -> List[Dict]:
        if self.__merge:
            for index, single_raw_fragment in enumerate(self.__raw_fragments):
                self.__process_single_raw_fragment(index, single_raw_fragment)

            return self.__merged_fragments
        else:
            return self.__raw_fragments

    def __process_single_raw_fragment(self, index, single_raw_fragment: Dict):
        start, end, text = single_raw_fragment['start'], single_raw_fragment['end'], single_raw_fragment['text']
        self.__reset_single_merged_fragment(start=start, end=end)

        if start - self.__single_merged_fragment["end"] > self.__max_gap_between_sentences:
            self.__flush_single_merged_fragment_when_gap_between_sentences_reached(start=start, end=end, text=text)

        else:
            self.__extend_single_merged_fragment_as_gap_not_reached(end=end, text=text)
            self.__flush_single_merged_fragment_as_end_of_sentence_detected(text=text, index=index)

    def __reset_single_merged_fragment(self, start: int, end: int):
        if self.__single_merged_fragment.get('start', None) is None:
            self.__single_merged_fragment['start'] = start

        if self.__single_merged_fragment.get('end', None) is None:
            self.__single_merged_fragment['end'] = end

        if self.__single_merged_fragment.get('text', None) is None:
            self.__single_merged_fragment['text'] = ""

    def __flush_single_merged_fragment_when_gap_between_sentences_reached(self, start, end, text):
        self.__merged_fragments.append(self.__single_merged_fragment)
        self.__single_merged_fragment = dict(start=start, end=end, text=text)

    def __extend_single_merged_fragment_as_gap_not_reached(self, end, text):
        self.__single_merged_fragment["end"] = end
        self.__single_merged_fragment['text'] = f"{self.__single_merged_fragment['text']}{self.__delimiter}{text.lstrip()}"

    def __flush_single_merged_fragment_as_end_of_sentence_detected(self, text, index):
        if (len(text) > 0 and text[-1] in settings.END_OF_SENTENCE) or index == self.__number_of_raw_fragments - 1:
            self.__merged_fragments.append(self.__single_merged_fragment)
            self.__single_merged_fragment = dict()

class NewlineRemover:
    @staticmethod
    def remove_newline(source_object: str):
        return str(source_object).replace("\r", "").replace("\n", " ")

    @staticmethod
    def interpret_newline(source_object: str):
        return str(source_object).replace("\r", "").replace("\n", "\\n")

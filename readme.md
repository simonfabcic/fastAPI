# This is my first fastAPI project

## How to use

1. Install the requirements using pipenv

-   Make sure you have pipenv installed. If not, you can install it using:

```bash
pip install pipenv
```

-   Create a virtual environment and install the dependencies:  
     If you want to have the venv into the system directory, delete `.venv` folder in the root of the project:

```bash
# create and activate virtual env
pipenv shell
# and instal dependencies
pipenv install --dev
```

-   Maybe you have to set the correct interpreter. In VScode press
    `Ctrl + Shift + p`
    and search for:
    `Python: Select interpreter`
    and find the location of python file:
    `...\.venv\Scripts\python.exe`
    If you want to check the current interpreter, run:
    ```shell
    pipenv --venv
    ```

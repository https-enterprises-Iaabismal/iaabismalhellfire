#include <iostream>
#include <fstream>
#include <string>

void catFile(const std::string& filename) {
    std::ifstream file(filename, std::ios::binary);
    if (!file.is_open()) {
        std::cerr << "cat: " << filename << ": No existe el archivo\n";
        return;
    }
    std::cout << file.rdbuf();
    file.close();
}

void catStdin() {
    std::string line;
    while (std::getline(std::cin, line)) {
        std::cout << line << "\n";
    }
}

int main(int argc, char* argv[]) {
    if (argc == 1) {
        catStdin();
        return 0;
    }

    for (int i = 1; i < argc; i++) {
        std::string arg = argv[i];
        if (arg == "-") {
            catStdin();
        } else {
            catFile(arg);
        }
    }

    return 0;
}

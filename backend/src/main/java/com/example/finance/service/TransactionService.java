package com.example.finance.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.finance.model.Transaction;
import com.example.finance.repository.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository repo;

    public Transaction save(Transaction t) {
        return repo.save(t);
    }

    public List<Transaction> getAll(Long userId) {
        return repo.findByUserId(userId);
    }
    public Double getTotalByType(Long userId, String type) {
        return repo.findByUserId(userId).stream()
                .filter(t -> t.getType().equalsIgnoreCase(type))
                .mapToDouble(Transaction::getAmount)
                .sum();
    }
}
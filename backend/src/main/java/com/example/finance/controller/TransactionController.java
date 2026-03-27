package com.example.finance.controller;

import com.example.finance.model.Transaction;
import com.example.finance.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin
public class TransactionController {

    @Autowired
    private TransactionService service;

    // Test API
    @GetMapping
    public String test() {
        return "API Working";
    }

    // POST API
    @PostMapping
    public Transaction add(@RequestBody Transaction t) {
        return service.save(t);
    }

    // GET Transactions by User
    @GetMapping("/{userId}")
    public List<Transaction> get(@PathVariable Long userId) {
        return service.getAll(userId);
    }

    // 🔥 SUMMARY API (NEW)
    @GetMapping("/summary/{userId}")
    public Map<String, Double> getSummary(@PathVariable Long userId) {

        double income = service.getTotalByType(userId, "INCOME");
        double expense = service.getTotalByType(userId, "EXPENSE");

        Map<String, Double> result = new HashMap<>();
        result.put("income", income);
        result.put("expense", expense);
        result.put("balance", income - expense);

        return result;
    }
}